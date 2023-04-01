import videos from "~/videos.json";

export const random = {
  choose: function<T> (entries: T[]): T {
    return entries[Math.floor(Math.random() * entries.length)];
  },
}

export const randomVideo = () => `/backgrounds/${random.choose(videos)}`;
