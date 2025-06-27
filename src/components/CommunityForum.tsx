import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, MessageSquare, ThumbsUp, Clock, Pin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CommunityForum = () => {
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<number | null>(null);
  const [isNewDiscussionOpen, setIsNewDiscussionOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [newDiscussionTitle, setNewDiscussionTitle] = useState("");
  const [newDiscussionContent, setNewDiscussionContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("General");
  const { toast } = useToast();

  const discussions = [
    {
      id: 1,
      title: "Load shedding schedule changes in Sandton",
      author: "Sarah M.",
      authorInitials: "SM",
      category: "Infrastructure",
      replies: 23,
      likes: 15,
      time: "2 hours ago",
      isPinned: true,
      preview: "Has anyone noticed the schedule changes? My area seems to be affected differently now..."
    },
    {
      id: 2,
      title: "Community garden project - seeking volunteers",
      author: "Thabo K.",
      authorInitials: "TK",
      category: "Community",
      replies: 8,
      likes: 12,
      time: "4 hours ago",
      isPinned: false,
      preview: "We're starting a community garden in Soweto. Looking for volunteers and donations..."
    },
    {
      id: 3,
      title: "Water saving tips that actually work",
      author: "Priya P.",
      authorInitials: "PP",
      category: "Environment",
      replies: 31,
      likes: 28,
      time: "1 day ago",
      isPinned: false,
      preview: "Here are some practical water saving methods I've been using during restrictions..."
    },
    {
      id: 4,
      title: "Local business recommendations",
      author: "Mike D.",
      authorInitials: "MD",
      category: "Business",
      replies: 19,
      likes: 22,
      time: "2 days ago",
      isPinned: false,
      preview: "Looking for recommendations for reliable electricians in the Johannesburg area..."
    }
  ];

  const categories = [
    { name: "Infrastructure", count: 45, color: "bg-red-100 text-red-700" },
    { name: "Community", count: 38, color: "bg-green-100 text-green-700" },
    { name: "Safety", count: 29, color: "bg-orange-100 text-orange-700" },
    { name: "Business", count: 31, color: "bg-blue-100 text-blue-700" },
    { name: "Environment", count: 24, color: "bg-teal-100 text-teal-700" },
    { name: "General", count: 52, color: "bg-purple-100 text-purple-700" }
  ];

  const handleJoinDiscussion = (discussionId: number) => {
    setSelectedDiscussion(discussionId);
    setIsJoinDialogOpen(true);
  };

  const handleSubmitReply = () => {
    if (!replyText.trim()) return;
    
    toast({
      title: "Reply posted!",
      description: "Your reply has been added to the discussion.",
    });
    
    setReplyText("");
    setIsJoinDialogOpen(false);
    setSelectedDiscussion(null);
  };

  const handleStartDiscussion = () => {
    if (!newDiscussionTitle.trim() || !newDiscussionContent.trim()) return;
    
    toast({
      title: "Discussion started!",
      description: "Your new discussion has been posted to the community.",
    });
    
    setNewDiscussionTitle("");
    setNewDiscussionContent("");
    setIsNewDiscussionOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Users className="h-6 w-6" />
            Community Forum
          </CardTitle>
          <CardDescription className="text-purple-600">
            Connect with your neighbors, share experiences, and help each other
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold text-purple-700">1,247</div>
              <div className="text-sm text-purple-600">Active community members</div>
            </div>
            <Dialog open={isNewDiscussionOpen} onOpenChange={setIsNewDiscussionOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700 transition-colors">
                  Start Discussion
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Start New Discussion</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Discussion Title</Label>
                    <Input
                      id="title"
                      value={newDiscussionTitle}
                      onChange={(e) => setNewDiscussionTitle(e.target.value)}
                      placeholder="Enter discussion title..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map((cat) => (
                        <option key={cat.name} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={newDiscussionContent}
                      onChange={(e) => setNewDiscussionContent(e.target.value)}
                      placeholder="Share your thoughts, questions, or information..."
                      rows={4}
                    />
                  </div>
                  <Button 
                    onClick={handleStartDiscussion}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={!newDiscussionTitle.trim() || !newDiscussionContent.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Post Discussion
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((category, index) => (
              <div key={index} className={`p-2 rounded-lg text-center cursor-pointer hover:opacity-80 transition-opacity ${category.color}`}>
                <div className="font-semibold text-sm">{category.count}</div>
                <div className="text-xs">{category.name}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {discussions.map((discussion) => (
          <Card key={discussion.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback className="bg-teal-100 text-teal-700">
                    {discussion.authorInitials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {discussion.isPinned && (
                      <Pin className="h-4 w-4 text-orange-500" />
                    )}
                    <h3 className="font-semibold text-lg">{discussion.title}</h3>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span>by {discussion.author}</span>
                    <Badge variant="outline" className="text-xs">
                      {discussion.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{discussion.time}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{discussion.preview}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{discussion.replies} replies</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{discussion.likes} likes</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="ml-auto hover:bg-purple-100 hover:text-purple-700 transition-colors"
                      onClick={() => handleJoinDiscussion(discussion.id)}
                    >
                      Join Discussion
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Join Discussion Modal */}
      <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Join Discussion</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reply">Your Reply</Label>
              <Textarea
                id="reply"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
              />
            </div>
            <Button 
              onClick={handleSubmitReply}
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={!replyText.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              Post Reply
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Community Guidelines</CardTitle>
          <CardDescription>
            Help us maintain a positive and supportive community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-800 mb-3">✅ Do</h4>
              <ul className="text-sm space-y-2 text-gray-600">
                <li>• Be respectful and kind to all members</li>
                <li>• Share helpful information and resources</li>
                <li>• Stay on topic and use appropriate categories</li>
                <li>• Report inappropriate content</li>
                <li>• Help newcomers feel welcome</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-red-800 mb-3">❌ Don't</h4>
              <ul className="text-sm space-y-2 text-gray-600">
                <li>• Post spam or promotional content</li>
                <li>• Share personal information publicly</li>
                <li>• Use offensive or discriminatory language</li>
                <li>• Spread misinformation</li>
                <li>• Engage in harassment or bullying</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityForum;
