import { NextApiRequest, NextApiResponse } from "next";
import redis from "../../utils/redis";
import rateLimit from "../../utils/rate-limit";

const limiter = rateLimit({
  uniqueTokenPerInterval: 500, // 500 unique tokens per interval
  interval: 60000, // 1 minute
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id }: any = req.query;

  try {
    // 检查用户是否超过了每分钟的最大请求数
    await limiter.check(res, 60, "CACHE_TOKEN").catch((e) => {
      // 每分钟 60 个请求（每秒轮询）
      return res.status(429).json({
        message:
          "您已超过最大请求数,请稍后重试。",
        description: "用户已超过最大请求数",
      });
    });
    const data = await redis.get(id);
    if (!data) return res.status(404).json({ message: "没有找到数据" });
    else return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
