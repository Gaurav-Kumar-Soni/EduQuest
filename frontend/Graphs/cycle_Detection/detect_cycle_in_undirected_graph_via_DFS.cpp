#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    bool detect_using_dfs(int ini_node, int parent_node, int V, vector<int> adj[], vector<int> &visited)
    {

        visited[ini_node] = 1;

        for (auto adjacent_node : adj[ini_node])
        {
            if (!visited[adjacent_node])
            {

                if (detect_using_dfs(adjacent_node, ini_node, V, adj, visited) == true)
                {
                    return true;
                }
            }
            else if (adjacent_node != parent_node)
            {
                return true;
            }
        }
        return false;
    }
    bool isCycle(int V, vector<int> adj[])
    {

        vector<int> visited(V, 0);

        for (int i = 0; i < V; i++)
        {
            if (!visited[i])
            {
                if (detect_using_dfs(i, -1, V, adj, visited) == true)
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
