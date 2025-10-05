
import React, { useState, useEffect } from 'react';
import { X, Heart, Share2, ExternalLink } from 'lucide-react';
import useSocialOutreachStore from '@/store/useSocialOutreachStore';


const SocialOutreachComponent = () => {
  const { socialOutreachs, fetchSocialOutreachs, loading, error } = useSocialOutreachStore();
  const [selectedPost, setSelectedPost] = useState(null);



  useEffect(() => {
    fetchSocialOutreachs();
  }, [fetchSocialOutreachs]);

  const openPopup = (post) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'unset';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-body-header text-[hsl(var(--cml-green))] mb-4">
              Social Outreach
            </h2>
            <p className="text-hero-subtext text-muted-foreground max-w-3xl mx-auto">
              Connecting communities through stories of impact and transformation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-border overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-muted"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-3 bg-muted rounded w-16"></div>
                    <div className="h-3 bg-muted rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-6 px-4 ">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
           <div className="text-center mb-12">
          <h2 className="text-body-header mb-6">
            SOCIAL MEDIA <span className="text-cml-orange">OUTREACH</span>
          </h2>
        </div>


          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {socialOutreachs && socialOutreachs.slice().reverse().map((post) => (
              <div
                key={post.id}
                onClick={() => openPopup(post)}
                className="bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
              >
                   <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <img
                  src={post.logo}
                  alt="CML Logo"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-foreground">CML</h3>
                  <p className="text-xs text-muted-foreground">@cmlnortheast</p>
                </div>
              </div>
             
            </div>
                  <img
                    src={post.image}
                    alt="Social outreach post"
                    className="w-full h-48 pt-2 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                {/* Post Image */}
                <div className="relative overflow-hidden">
                  <div className="absolute top-3 left-3 bg-[hsl(var(--cml-green))] text-white px-2 py-1 rounded-full text-xs font-medium">
                    {post.icon}
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-4">
                  <div className="text-xs text-[hsl(var(--cml-orange))] font-medium mb-2">
                    {formatDate(post.date)}
                  </div>
                  
                  <p className="text-body text-foreground mb-3 leading-relaxed">
                    {truncateText(post.msg)}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-[hsl(var(--cml-green))/10] text-[hsl(var(--cml-green))] rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Engagement Stats */}
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {post.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="w-3 h-3" />
                      {post.shares}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {selectedPost && (
        <div  className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div  className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <img
                  src={selectedPost.logo}
                  alt="CML Logo"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-foreground">CML</h3>
                  <p className="text-xs text-muted-foreground">@cmlnortheast</p>
                </div>
              </div>
              <button
                onClick={closePopup}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div onClick={() => window.open(selectedPost.link, '_blank')} className="overflow-y-auto max-h-[70vh]">
              {/* Image */}
              <div className="relative">
                <img
                  src={selectedPost.image}
                  alt="Social outreach post"
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* Post Details */}
              <div className="p-6">
                <div className="text-sm text-[hsl(var(--cml-orange))] font-medium mb-3">
                  {formatDate(selectedPost.date)}
                </div>
                
                <p className="text-base text-foreground mb-6 leading-relaxed">
                  {selectedPost.msg}
                </p>

                {/* All Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-sm px-3 py-1 bg-[hsl(var(--cml-green))/10] text-[hsl(var(--cml-green))] rounded-full hover:bg-[hsl(var(--cml-green))/20] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Engagement and Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      {selectedPost.likes} likes
                    </div>
                   
                  </div>
                  
                  <button
                    onClick={async () => {
                      if (navigator.share) {
                        await navigator.share({ url: selectedPost.link, title: 'CML Social Outreach', text: selectedPost.msg });
                      } else {
                        await navigator.clipboard.writeText(selectedPost.link);
                        alert('Link copied to clipboard!');
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-[hsl(var(--cml-green))] text-white rounded-lg  transition-colors text-sm font-medium"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SocialOutreachComponent;