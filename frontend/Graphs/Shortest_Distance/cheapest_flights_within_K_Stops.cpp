#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    int findCheapestPrice(int n, vector<vector<int>> &flights, int src, int dst,
                          int k)
    {
        vector<pair<int, int>> adj[n];

        int M = flights.size();
        for (int i = 0; i < M; i++)
        {
            int u = flights[i][0];
            int v = flights[i][1];
            int cost = flights[i][2];
            adj[u].push_back({v, cost});
        }

        vector<int> dist(n, 1e9);
        dist[src] = 0;

        // dijkstra without priority_queue (no benifit with p_queue);
        queue<pair<int, pair<int, int>>> nodeQueue;
        //    datatype in nodeQueue:- {stops,{node, price}}
        nodeQueue.push({0, {src, 0}});

        while (!nodeQueue.empty())
        {
            auto it = nodeQueue.front();
            nodeQueue.pop();

            int stops = it.first;
            int node = it.second.first;
            int price = it.second.second;

            if (stops > k)
                continue;

            for (auto it : adj[node])
            {
                int adjNode = it.first;
                int edge_wt = it.second;

                if (price + edge_wt < dist[adjNode] && stops <= k)
                {
                    dist[adjNode] = price + edge_wt;
                    nodeQueue.push({stops + 1, {adjNode, price + edge_wt}});
                }
            }
        }
        if (dist[dst] == 1e9)
            return -1;
        return dist[dst];
    }
};