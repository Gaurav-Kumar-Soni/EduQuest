#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    bool detect_using_bfs(int ini_node, int V, vector<int> adj[], vector<int> &visited)
    {
        queue<pair<int, int>> nodeQueue;

        visited[ini_node] = 1;

        nodeQueue.push({ini_node, -1}); //{{current_node, parent_node}}

        while (!nodeQueue.empty())
        {
            int node = nodeQueue.front().first;
            int src = nodeQueue.front().second; // src means parent node or previous node.
            nodeQueue.pop();

            for (auto it : adj[node])
            {
                if (!visited[it])
                {
                    nodeQueue.push({it, node});
                    visited[it] = 1;
                }
                else if (src != it)
                {
                    return true; // means it it touched already by other not by its previous (parent) node.
                }
            }
        }
        return false;
    }
    bool isCycle(int V, vector<int> adj[])
    {

        vector<int> visited(V, 0);
        bool isLoop = false;
        for (int i = 0; i < V; i++)
        {
            if (!visited[i])
            {
                if (detect_using_bfs(i, V, adj, visited))
                {
                    return true;
                }
            }
        }
        return false;
    }
};

int main()
{
    int tc;
    cin >> tc;
    while (tc--)
    {
        int V, E;
        cin >> V >> E;
        vector<int> adj[V];
        for (int i = 0; i < E; i++)
        {
            int u, v;
            cin >> u >> v;
            adj[u].push_back(v);
            adj[v].push_back(u);
        }
        Solution obj;
        bool ans = obj.isCycle(V, adj);
        if (ans)
            cout << "1\n";
        else
            cout << "0\n";
    }
    return 0;
}