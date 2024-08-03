#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    bool isCyclic(int V, vector<int> adj[])
    {
        vector<int> inDegree(V, 0);
        queue<int> nodeQueue;
        int count = 0;

        for (int i = 0; i < V; i++)
        {
            for (auto it : adj[i])
            {
                inDegree[it]++;
            }
        }

        for (int i = 0; i < V; i++)
        {
            if (inDegree[i] == 0)
            {
                nodeQueue.push(i);
            }
        }

        while (!nodeQueue.empty())
        {
            int node = nodeQueue.front();
            nodeQueue.pop();
            count++;
            for (auto it : adj[node])
            {
                inDegree[it]--;

                if (inDegree[it] == 0)
                {
                    nodeQueue.push(it);
                }
            }
        }

        return count != V;
    }
};

int main()
{

    int t;
    cin >> t;
    while (t--)
    {
        int V, E;
        cin >> V >> E;

        vector<int> adj[V];

        for (int i = 0; i < E; i++)
        {
            int u, v;
            cin >> u >> v;
            adj[u].push_back(v);
        }

        Solution obj;
        cout << obj.isCyclic(V, adj) << "\n";
    }

    return 0;
}
