// GFG :- [https://www.geeksforgeeks.org/problems/shortest-path-in-undirected-graph-having-unit-distance/1]

#include <bits/stdc++.h>
using namespace std;
class Solution
{
public:
    vector<int> shortestPath(vector<vector<int>> &edges, int N, int M, int src)
    {

        vector<int> adj[N];
        for (auto it : edges)
        {
            adj[it[0]].push_back(it[1]);
            adj[it[1]].push_back(it[0]);
        }

        queue<int> nodeQueue;
        nodeQueue.push(src);

        vector<int> dist(N);

        for (int i = 0; i < N; i++)
        {
            dist[i] = INT_MAX;
        }
        dist[src] = 0;

        while (!nodeQueue.empty())
        {
            int node = nodeQueue.front();
            nodeQueue.pop();

            for (auto it : adj[node])
            {

                if (dist[it] > dist[node] + 1)
                {
                    dist[it] = dist[node] + 1;
                    nodeQueue.push(it);
                }
            }
        }

        for (int i = 0; i < N; i++)
        {
            if (dist[i] == INT_MAX)
            {
                dist[i] = -1;
            }
        }

        return dist;
    }
};

int main()
{
    return 0;
}
