import axios from "axios";

/**
 * Discord Avatar Decoration CDN Helper
 * Based on successful debug results - supports WebP (7KB) and PNG (799KB) formats
 */
class DiscordDecorationCDN {
    constructor() {
        this.primaryCDN = 'https://cdn.discordapp.com/avatar-decoration-presets';
        this.mediaCDN = 'https://media.discordapp.net/avatar-decoration-presets';
    }

    /**
     * Get avatar decoration URL with optimal format selection
     * @param {string} assetId - The decoration asset ID
     * @param {object} options - Configuration options
     * @returns {object} Object with multiple format URLs
     */
    getDecorationURLs(assetId, options = {}) {
        const {
            size = null,
            cdn = 'primary',
            preferWebP = true // WebP is 114x smaller (7KB vs 799KB)
        } = options;

        if (!assetId) return null;

        // Ensure asset ID is properly formatted
        const cleanAssetId = assetId.startsWith('a_') ? assetId : `a_${assetId}`;
        const baseURL = cdn === 'media' ? this.mediaCDN : this.primaryCDN;
        
        // Build URLs for different formats
        const buildURL = (format, withSize = false) => {
            let url = `${baseURL}/${cleanAssetId}.${format}`;
            if (withSize && size) {
                url += `?size=${size}`;
            }
            return url;
        };

        return {
            // WebP - Best choice (7KB, transparent, excellent quality)
            webp: buildURL('webp'),
            webp_sized: size ? buildURL('webp', true) : null,
            
            // PNG - Fallback (799KB, transparent)
            png: buildURL('png'),
            png_sized: size ? buildURL('png', true) : null,
            
            // Media CDN alternatives
            media_webp: `${this.mediaCDN}/${cleanAssetId}.webp`,
            media_png: `${this.mediaCDN}/${cleanAssetId}.png`,
            
            // Recommended URL (WebP first, PNG fallback)
            recommended: preferWebP ? buildURL('webp') : buildURL('png'),
            fallback: preferWebP ? buildURL('png') : buildURL('webp')
        };
    }

    /**
     * Get decoration info with size optimization
     * @param {string} assetId - The decoration asset ID
     * @returns {object} Decoration metadata
     */
    getDecorationInfo(assetId) {
        if (!assetId) return null;

        const urls = this.getDecorationURLs(assetId);
        
        return {
            asset: assetId,
            isAnimated: assetId.startsWith('a_'),
            urls: urls,
            // Recommended usage for different scenarios
            usage: {
                // For web performance - use WebP (99% smaller)
                web_optimized: urls.webp,
                // For compatibility - use PNG
                compatible: urls.png,
                // For thumbnails
                thumbnail: this.getDecorationURLs(assetId, { size: 128 }).webp,
                // For high-res display
                high_res: this.getDecorationURLs(assetId, { size: 512 }).png
            }
        };
    }
}

// Initialize CDN helper
const decorationCDN = new DiscordDecorationCDN();

const userId = "1102123627438153738";
const url = `https://api.lanyard.rest/v1/users/${userId}`;

const fetchLanyardData = async () => {
    try {
        let res = await axios.get(url);
        const data = res.data.data;
        
        console.log("Lanyard data fetched:", data);
        
        // Process avatar decoration data
        const avatarDecorationData = data.discord_user.avatar_decoration_data;
        let decorationInfo = null;
        
        if (avatarDecorationData?.asset) {
            decorationInfo = decorationCDN.getDecorationInfo(avatarDecorationData.asset);
            console.log("Avatar decoration processed:", decorationInfo);
        }
        
        // Enhanced avatar URL construction
        const constructAvatarURL = (avatar, userId, size = 256, format = 'auto') => {
            if (!avatar) {
                // Default Discord avatar
                return `https://cdn.discordapp.com/embed/avatars/${parseInt(data.discord_user.discriminator || '0') % 5}.png`;
            }
            
            // Auto-detect format based on avatar hash
            if (format === 'auto') {
                format = avatar.startsWith('a_') ? 'gif' : 'webp'; // Use WebP for static avatars
            }
            
            return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.${format}?size=${size}`;
        };
        
        // Return structured data for the avatar component
        return {
            // Discord user info with enhanced avatar decoration support
            discord_user: {
                id: data.discord_user.id,
                username: data.discord_user.username,
                discriminator: data.discord_user.discriminator,
                avatar: data.discord_user.avatar,
                display_name: data.discord_user.display_name || data.discord_user.username,
                global_name: data.discord_user.global_name,
                public_flags: data.discord_user.public_flags,
                
                // Enhanced avatar URLs with format optimization
                avatar_urls: {
                    // Standard sizes with WebP optimization
                    small: constructAvatarURL(data.discord_user.avatar, data.discord_user.id, 128, 'webp'),
                    medium: constructAvatarURL(data.discord_user.avatar, data.discord_user.id, 256, 'webp'),
                    large: constructAvatarURL(data.discord_user.avatar, data.discord_user.id, 512, 'webp'),
                    
                    // Animated version if available
                    animated: data.discord_user.avatar?.startsWith('a_') 
                        ? constructAvatarURL(data.discord_user.avatar, data.discord_user.id, 256, 'gif')
                        : null,
                    
                    // PNG fallbacks
                    png_medium: constructAvatarURL(data.discord_user.avatar, data.discord_user.id, 256, 'png'),
                    png_large: constructAvatarURL(data.discord_user.avatar, data.discord_user.id, 512, 'png'),
                    
                    // Primary URL (recommended)
                    primary: constructAvatarURL(data.discord_user.avatar, data.discord_user.id, 256, 'auto')
                },
                
                // Avatar decoration with complete CDN support
                avatar_decoration_data: avatarDecorationData,
                avatar_decoration: decorationInfo ? {
                    // Raw decoration data from Discord
                    raw: avatarDecorationData,
                    
                    // Processed decoration info with CDN URLs
                    info: decorationInfo,
                    
                    // Quick access URLs (transparent PNGs and WebPs)
                    urls: {
                        // Recommended for web (WebP - 7KB, transparent)
                        webp: decorationInfo.urls.webp,
                        webp_small: decorationCDN.getDecorationURLs(avatarDecorationData.asset, { size: 128 }).webp,
                        webp_large: decorationCDN.getDecorationURLs(avatarDecorationData.asset, { size: 512 }).webp,
                        
                        // PNG fallback (799KB, transparent)
                        png: decorationInfo.urls.png,
                        png_small: decorationCDN.getDecorationURLs(avatarDecorationData.asset, { size: 128 }).png,
                        png_large: decorationCDN.getDecorationURLs(avatarDecorationData.asset, { size: 512 }).png,
                        
                        // Media CDN alternatives
                        media_webp: decorationInfo.urls.media_webp,
                        media_png: decorationInfo.urls.media_png
                    },
                    
                    // Usage recommendations
                    recommended: {
                        // For performance-critical applications
                        web_optimized: decorationInfo.usage.web_optimized,
                        // For maximum compatibility
                        compatible: decorationInfo.usage.compatible,
                        // For thumbnails/small displays
                        thumbnail: decorationInfo.usage.thumbnail,
                        // For high-resolution displays
                        high_res: decorationInfo.usage.high_res
                    },
                    
                    // Decoration metadata
                    metadata: {
                        asset_id: avatarDecorationData.asset,
                        sku_id: avatarDecorationData.sku_id,
                        is_animated: decorationInfo.isAnimated,
                        is_transparent: true, // All Discord decorations are transparent
                        format_support: {
                            webp: true,   // 7KB - recommended
                            png: true,    // 799KB - fallback
                            gif: false    // Not supported by Discord CDN
                        }
                    }
                } : null,
                
                // Legacy support (for backward compatibility)
                avatar_decoration_url: decorationInfo?.urls.recommended || null
            },
            
            // Online status
            discord_status: data.discord_status, // online, idle, dnd, offline
            
            // Activities (games, spotify, etc.)
            activities: data.activities || [],
            
            // Spotify if available
            spotify: data.spotify || null,
            
            // Active on Discord platforms
            active_on_discord_web: data.active_on_discord_web,
            active_on_discord_desktop: data.active_on_discord_desktop,
            active_on_discord_mobile: data.active_on_discord_mobile,
            
            // Listening to Spotify
            listening_to_spotify: data.listening_to_spotify,
            
            // Additional metadata
            metadata: {
                fetched_at: new Date().toISOString(),
                has_avatar_decoration: !!decorationInfo,
                avatar_is_animated: data.discord_user.avatar?.startsWith('a_') || false,
                decoration_is_animated: decorationInfo?.isAnimated || false
            }
        };
        
    } catch (error) {
        console.error("Error fetching Lanyard data:", error);
        return null;
    }
};

// Export both the main function and the CDN helper for advanced usage
export default fetchLanyardData;
export { DiscordDecorationCDN };