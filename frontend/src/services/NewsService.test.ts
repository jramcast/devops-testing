import { NewsItem } from "../models/News";
import * as service from "./NewsService";

const dummyNews: NewsItem = {
    id: "asdf",
    title: "news",
    timestamp: "2020-01-01",
};

describe("NewsService", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    describe("#getNews", () => {
        test("sends a GET request", async () => {
            fetchMock.mockResponseOnce(JSON.stringify([dummyNews]));
            const response = await service.getNews();
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(response).toEqual([dummyNews]);
        });
    });
});
