//{ Driver Code Starts
#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    bool directed_dfs(int node, vector<int> adj[], int *visited, int *path_visited)
    {
        visited[node] = 1;
        path_visited[node] = 1;

        // traverse of its adjacent nodes
        for (auto it : adj[node])
        {
            // when node is not visited
            if (visited[it] != 1)
            {
                if (directed_dfs(it, adj, visited, path_visited) == true)
                {
                    return true;
                }
            }
            // if the node has been previously visited
            // but it has to be visited on the same path ..
            else if (path_visited[it] == 1)
            {
                return true;
            }
        }
        path_visited[node] = 0;
        return false;
    }
    bool isCyclic(int V, vector<int> adj[])
    {

        int visited[V + 1] = {0};
        int path_visited[V + 1] = {0};

        // also can use only one visited array as Mark '1' for visited and '2' for path visited;

        for (int i = 0; i < V; i++)
        {
            if (visited[i] != 1)
            {
                if (directed_dfs(i, adj, visited, path_visited) == true)
                {
                    return true;
                }
            }
        }
        return false;
    }
};

//************************** using only one visited array (wisely use of visited array)********************
/*
class Solution
{
public:
    // Function to detect cycle in a directed graph.

    bool directed_dfs(int node, vector<int> adj[], int *visited)
    {
        visited[node] = 2;

        // traverse of its adjacent nodes
        for (auto it : adj[node])
        {
            // when node is not visited
            if (visited[it] == 0)
            {
                if (directed_dfs(it, adj, visited) == true)
                {
                    return true;
                }
            }
            // if the node has been previously visited
            // but it has to be visited on the same path ..
            else if (visited[it] == 2)
            {
                return true;
            }
        }
        visited[node] = 1;
        return false;
    }
    bool isCyclic(int V, vector<int> adj[])
    {
        // code here
        int visited[V + 1] = {0};

        for (int i = 0; i < V; i++)
        {
            if (visited[i] == 0)
            {
                if (directed_dfs(i, adj, visited) == true)
                {
                    return true;
                }
            }
        }
        return false;
    }
};*/

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
