import { MyContext } from "../types";
import { Post } from "../entities/Post";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.findAll(Post, { populate: ["user"] });
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext,
  ): Promise<Post | null> {
    return em.findOne(Post, { id }, { populate: ["user"] });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title") title: string,
    @Arg("user_id") userId: number,
    @Ctx() { em }: MyContext,
  ): Promise<Post> {
    let post = em.create(Post, { title: title, user: userId });
    await em.persistAndFlush(post);
    post = await em.populate(post, ["user"]);

    return post;
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("title") title: string,
    @Ctx() { em }: MyContext,
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { id }, { populate: ["user"] });
    if (!post) {
      return null;
    }
    post.title = title;

    await em.persistAndFlush(post);

    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext,
  ): Promise<boolean> {
    await em.nativeDelete(Post, { id });
    return true;
  }
}
