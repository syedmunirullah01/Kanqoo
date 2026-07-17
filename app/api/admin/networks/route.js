// app/api/admin/networks/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Network from '@/models/Network';
import Merchant from '@/models/Merchant';

// Helper function to safely encrypt (with fallback)
function safeEncrypt(value) {
  try {
    // Import encryption only if available
    const { encrypt } = require('@/lib/encryption');
    return encrypt(value);
  } catch (error) {
    console.warn('Encryption module not available, storing without encryption');
    return value;
  }
}

// Helper function to safely decrypt (with fallback)
function safeDecrypt(value) {
  try {
    const { decrypt, isEncrypted } = require('@/lib/encryption');
    if (isEncrypted(value)) {
      return decrypt(value);
    }
    return value;
  } catch (error) {
    console.warn('Decryption module not available');
    return value;
  }
}

export async function GET(request) {
  try {
    await dbConnect();

    const networks = await Network.find({ isActive: true })
      .select('-authToken -refreshToken') // Exclude sensitive tokens
      .sort({ createdAt: -1 })
      .lean();

    // Build merchant counts keyed by sanitized network name/adapter
    const merchantAggregation = await Merchant.aggregate([
      {
        $group: {
          _id: { $ifNull: ['$network', 'unknown'] },
          count: { $sum: 1 }
        }
      }
    ]);

    const sanitizeKey = (value = '') =>
      value
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');

    const merchantCountMap = {};
    merchantAggregation.forEach(({ _id, count }) => {
      const key = sanitizeKey(_id);
      if (!key) return;
      merchantCountMap[key] = count;
    });

    // Format the response data
    const formattedNetworks = networks.map(network => {
      const adapterKey = sanitizeKey(network.adapter);
      const nameKey = sanitizeKey(network.name);
      const aggregatedCount =
        merchantCountMap[nameKey] ??
        merchantCountMap[adapterKey] ??
        network.merchantCount ??
        network.merchants ??
        0;

      // Add last sync display text
      if (network.lastSync) {
        const lastSync = new Date(network.lastSync);
        const now = new Date();
        const diffHours = Math.floor((now - lastSync) / (1000 * 60 * 60));

        if (diffHours < 1) {
          network.lastSyncDisplay = 'Just now';
        } else if (diffHours < 24) {
          network.lastSyncDisplay = `${diffHours} hours ago`;
        } else {
          network.lastSyncDisplay = lastSync.toLocaleDateString();
        }
      } else {
        network.lastSyncDisplay = 'Never';
      }

      // Format earnings
      network.earnings = network.totalEarnings || 0;
      network.merchantCount = aggregatedCount;
      network.merchants = aggregatedCount;
      network.lastSync = network.lastSyncDisplay;

    // Keep credentials for editing (they will be decrypted on frontend if needed)
    // Credentials are encrypted in database, so they're safe to return

      return network;
    });

    return NextResponse.json({
      success: true,
      data: formattedNetworks,
      count: formattedNetworks.length
    });
  } catch (error) {
    console.error('Failed to fetch networks:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch networks',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'commission', 'adapter'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(', ')}`
        },
        { status: 400 }
      );
    }

    if (!body.credentials || typeof body.credentials !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Credentials object is required' },
        { status: 400 }
      );
    }

    // Check for existing network
    const existingNetwork = await Network.findOne({
      name: { $regex: new RegExp(`^${body.name}$`, 'i') },
      isActive: true
    });

    if (existingNetwork) {
      return NextResponse.json(
        { success: false, error: 'Network with this name already exists' },
        { status: 409 }
      );
    }

    // Prepare credentials with encryption
    let processedCredentials = { ...body.credentials };
    try {
      // Encrypt sensitive fields
      if (processedCredentials.clientSecret) {
        processedCredentials.clientSecret = safeEncrypt(processedCredentials.clientSecret);
      }
      if (processedCredentials.apiSecret) {
        processedCredentials.apiSecret = safeEncrypt(processedCredentials.apiSecret);
      }
    } catch (encryptionError) {
      console.error('Encryption failed:', encryptionError);
      // Continue without encryption in development
      if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json(
          { success: false, error: 'Failed to secure credentials' },
          { status: 500 }
        );
      }
    }

    // Create new network
    const newNetwork = new Network({
      name: body.name.trim(),
      description: body.description?.trim(),
      website: body.website?.trim(),
      supportEmail: body.supportEmail?.trim(),
      adapter: body.adapter,
      credentials: processedCredentials,
      commission: body.commission,
      minimumPayout: body.minimumPayout || 50,
      currency: body.currency || 'USD',
      status: body.status || 'pending',
      apiStatus: body.apiStatus || 'pending',
      settings: {
        deepLinking: body.deepLinking !== undefined ? body.deepLinking : true,
        mobileTracking: body.mobileTracking !== undefined ? body.mobileTracking : true,
        realTimeStats: body.realTimeStats !== undefined ? body.realTimeStats : true,
        emailReports: body.emailReports !== undefined ? body.emailReports : true,
        emailFrequency: body.emailFrequency || 'weekly',
        notifications: body.notifications !== undefined ? body.notifications : true
      },
      tags: body.tags || [body.adapter],
      merchantCount: 0,
      productCount: 0,
      totalEarnings: 0,
      totalClicks: 0,
      totalConversions: 0,
      connectionDate: new Date()
    });

    await newNetwork.save();

    // Prepare response (exclude sensitive data)
    const networkResponse = newNetwork.toObject();
    delete networkResponse.credentials;
    delete networkResponse.authToken;
    delete networkResponse.refreshToken;

    networkResponse.lastSyncDisplay = 'Never';
    networkResponse.earnings = 0;
    networkResponse.merchants = 0;
    networkResponse.lastSync = 'Never';

    return NextResponse.json(
      {
        success: true,
        data: networkResponse,
        message: 'Network added successfully'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to add network:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { success: false, error: errors.join(', ') },
        { status: 400 }
      );
    }

    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Network with this name already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to add network',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Network ID is required' },
        { status: 400 }
      );
    }

    const network = await Network.findById(id);
    if (!network) {
      return NextResponse.json(
        { success: false, error: 'Network not found' },
        { status: 404 }
      );
    }

    // Update network fields
    Object.assign(network, updateData);
    network.updatedAt = new Date();

    await network.save();

    // Return updated network without sensitive data
    const updatedNetwork = network.toObject();
    delete updatedNetwork.credentials;
    delete updatedNetwork.authToken;
    delete updatedNetwork.refreshToken;

    // Add display fields
    if (updatedNetwork.lastSync) {
      const lastSync = new Date(updatedNetwork.lastSync);
      const now = new Date();
      const diffHours = Math.floor((now - lastSync) / (1000 * 60 * 60));

      if (diffHours < 1) {
        updatedNetwork.lastSyncDisplay = 'Just now';
      } else if (diffHours < 24) {
        updatedNetwork.lastSyncDisplay = `${diffHours} hours ago`;
      } else {
        updatedNetwork.lastSyncDisplay = lastSync.toLocaleDateString();
      }
    } else {
      updatedNetwork.lastSyncDisplay = 'Never';
    }

    updatedNetwork.earnings = updatedNetwork.totalEarnings || 0;
    updatedNetwork.merchants = updatedNetwork.merchantCount || 0;
    updatedNetwork.lastSync = updatedNetwork.lastSyncDisplay;

    return NextResponse.json({
      success: true,
      data: updatedNetwork,
      message: 'Network updated successfully'
    });
  } catch (error) {
    console.error('Failed to update network:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { success: false, error: errors.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update network',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Network ID is required' },
        { status: 400 }
      );
    }

    const network = await Network.findById(id);
    if (!network) {
      return NextResponse.json(
        { success: false, error: 'Network not found' },
        { status: 404 }
      );
    }

    // Soft delete
    network.isActive = false;
    network.status = 'disconnected';
    network.updatedAt = new Date();
    await network.save();

    return NextResponse.json({
      success: true,
      message: 'Network deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete network:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete network',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
