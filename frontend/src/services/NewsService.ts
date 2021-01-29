import { getRESTClient, ServiceName } from "../API";
import { NewsItem } from "../models/News";

const API = getRESTClient(ServiceName.GW_SERVICE);

export async function getNews(): Promise<NewsItem[]> {
    return API.url("/news").get().json<NewsItem[]>();
}
