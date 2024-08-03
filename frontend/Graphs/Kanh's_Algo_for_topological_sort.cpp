#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    vector<int> topoSort(int V, vector<int> adj[])
    {
        // Create a vector to store the in-degree of each node
        vector<int> inDegree(V, 0);

        // Vector to store the topological sort order
        vector<int> topoSortOrder;

        // Queue to store nodes with in-degree 0
        queue<int> nodeQueue;

        // Calculate the in-degree of each node
        for (int i = 0; i < V; i++)
        {
            for (auto it : adj[i])
            {
                inDegree[it]++;
            }
        }

        // Add nodes which has initially in-degree 0  to the queue
        for (int i = 0; i < V; i++)
        {
            if (inDegree[i] == 0)
            {
                nodeQueue.push(i);
            }
        }

        // Process nodes in the queue
        while (!nodeQueue.empty())
        {
            int node = nodeQueue.front();
            nodeQueue.pop();

            // Add the node to the topological sort order
            topoSortOrder.push_back(node);

            // Decrease the in-degree of all neighbors
            for (auto it : adj[node])
            {
                inDegree[it]--;
               // If a neighbor's in-degree becomes 0, add it to the queue
                if (inDegree[it] == 0)
                {
                    nodeQueue.push(it);
                }
            }
        }

        return topoSortOrder;
    }
};

int main()
{
    return 0;
}