#include <bits/stdc++.h>
using namespace std;

class Solution
{
private:
    void dfs_helper(int node, int visited[], vector<int> adj[], vector<int> &dfs_list)
    {

        visited[node] = 1;
        dfs_list.push_back(node);
        // traverse all the Adjacent of this current node via adjacent matrix
        for (auto it : adj[node])
        {
            if (visited[it] != 1)
            {

                dfs_helper(it, visited, adj, dfs_list);
            }
        }
    }

public:
    // Function to return a list containing the DFS traversal of the graph.

    vector<int> dfsOfGraph(int V, vector<int> adj[])
    {
        int visited[V];
        memset(visited, 0, sizeof(visited)); // Add this line to initialize list or array

        int start = 0;
        vector<int> dfs_list;
        dfs_helper(start, visited, adj, dfs_list);
        return dfs_list;
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
        // string s1;
        // cin>>s1;
        Solution obj;
        vector<int> ans = obj.dfsOfGraph(V, adj);
        for (int i = 0; i < ans.size(); i++)
        {
            cout << ans[i] << " ";
        }
        cout << endl;
    }
    return 0;
}
// } Driver Code Ends