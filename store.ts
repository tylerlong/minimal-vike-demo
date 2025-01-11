import { RealtimeChannel, Session } from "@supabase/supabase-js";
import { exclude, manage, runInAction } from "manate";

import { supabase } from "./supabase/client";

export type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export class Store {
  session: Session | undefined;
  posts: Post[] = [];
  postsChannel: RealtimeChannel | undefined;
  uploadImageModalOpen = false;

  async fetchPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", this.session?.user?.id);
    if (error) throw error;
    this.posts = data.map((post) => post as Post);
  }

  async updatePost(id: string, title: string, content: string) {
    const post = this.posts.find((post) => post.id === id);
    if (!post) return;
    if (post.title === title && post.content === content) return;
    const { error } = await supabase
      .from("posts")
      .update({ title, content, updated_at: "now()" })
      .eq("id", id);
    if (error) throw error;
  }

  async deletePost(id: string) {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) throw error;
  }

  async createPost(title: string, content: string): Promise<Post> {
    const r = await supabase
      .from("posts")
      .insert({ title, content, user_id: this.session?.user?.id }).select();
    if (r.error) throw r.error;
    return r.data![0];
  }

  public subscribe() {
    const postsChannel = supabase
      .channel("public:posts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        (payload) => {
          const { eventType, new: newPost, old: oldPost } = payload;
          switch (eventType) {
            case "INSERT": {
              runInAction(() => this.posts.push(newPost as Post));
              break;
            }
            case "UPDATE": {
              runInAction(() => {
                const index = this.posts.findIndex(
                  (post) => post.id === newPost.id,
                );
                this.posts[index] = newPost as Post;
              });
              break;
            }
            case "DELETE": {
              runInAction(() => {
                const index = store.posts.findIndex(
                  (post) => post.id === oldPost.id,
                );
                store.posts.splice(index, 1);
              });
              break;
            }
            default: {
              break;
            }
          }
        },
      )
      .subscribe();
    this.postsChannel = exclude(postsChannel);
  }

  public signIn(session: Session) {
    this.session = session;
    this.fetchPosts();
    this.subscribe();
  }

  public signOut() {
    this.session = undefined;
    this.posts = [];
    if (this.postsChannel) {
      this.postsChannel.unsubscribe();
      this.postsChannel = undefined;
    }
  }
}

const store = manage(new Store());

supabase.auth.onAuthStateChange((_event, session) => {
  if (session) {
    if (!store.session) {
      // fist time sign in
      store.signIn(session);
    } else {
      // session refresh
      store.session = session;
    }
  } else {
    // sign out
    store.signOut();
  }
});

export default store;
