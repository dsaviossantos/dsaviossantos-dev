"use client";
import { updateContent, getData } from "@/app/actions";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [content, setContent] = useState({
    name: "",
    description: "",
    avatarUrl: "",
    links: [{ title: "", url: "" }],
    socialLinks: [{ platform: "", url: "" }],
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getData();
      setContent(data);
    };
    fetchContent();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const handleLinkChange = (index: number, field: string, value: string) => {
    const newLinks = [...content.links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setContent({ ...content, links: newLinks });
  };

  const handleSocialLinkChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const newSocialLinks = [...content.socialLinks];
    newSocialLinks[index] = { ...newSocialLinks[index], [field]: value };
    setContent({ ...content, socialLinks: newSocialLinks });
  };

  const handleAddLink = () => {
    setContent({
      ...content,
      links: [...content.links, { title: "", url: "" }],
    });
  };

  const handleAddSocialLink = () => {
    setContent({
      ...content,
      socialLinks: [...content.socialLinks, { platform: "", url: "" }],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateContent(content);
    alert("Content updated successfully!");
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <Card className="min-w-80">
      <CardHeader>
        <CardTitle>Edit BioPage Content</CardTitle>
        <CardDescription>Update your information here</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={content.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={content.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="avatarUrl">Avatar URL</Label>
            <Input
              id="avatarUrl"
              name="avatarUrl"
              value={content.avatarUrl}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Links</Label>
            {content.links.map((link, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  placeholder="Title"
                  value={link.title}
                  onChange={(e) =>
                    handleLinkChange(index, "title", e.target.value)
                  }
                  required
                />
                <Input
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) =>
                    handleLinkChange(index, "url", e.target.value)
                  }
                  required
                />
              </div>
            ))}
            <Button type="button" onClick={handleAddLink}>
              Add Link
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Social Links</Label>
            {content.socialLinks.map((link, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  placeholder="Platform"
                  value={link.platform}
                  onChange={(e) =>
                    handleSocialLinkChange(index, "platform", e.target.value)
                  }
                  required
                />
                <Input
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) =>
                    handleSocialLinkChange(index, "url", e.target.value)
                  }
                  required
                />
              </div>
            ))}
            <Button type="button" onClick={handleAddSocialLink}>
              Add Social Link
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
