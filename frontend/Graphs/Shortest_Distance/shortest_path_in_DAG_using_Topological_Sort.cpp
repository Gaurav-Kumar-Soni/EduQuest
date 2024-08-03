#include <bits/stdc++.h>
using namespace std;
class Solution
{
private:
    void topoSort(int node, vector<pair<int, int>> adj[], vector<int> &visited, stack<int> &st)
    {

        visited[node] = 1;

        for (auto it : adj[node])
        {
            int v = it.first;
            if (!visited[v])
            {
                topoSort(v, adj, visited, st);
            }
        }
        st.push(node);
    }

public:
    vector<int> shortestPath(int N, int M, vector<vector<int>> &edges)
    {
        vector<pair<int, int>> adj[N];
        for (int i = 0; i < M; i++)
        {
            int u = edges[i][0];
            int v = edges[i][1];
            int wt = edges[i][2];

            adj[u].push_back({v, wt});
        }
        // find the topoSort
        stack<int> st;
        vector<int> visited(N, 0);
        for (int i = 0; i < N; i++)
        {
            if (!visited[i])
            {
                topoSort(i, adj, visited, st);
            }
        }
        // step 2 : Do the Distance Thing-------
        vector<int> distance(N);
        for (int i = 0; i < N; i++)
        {
            distance[i] = 1e9;
        }
        int src = 0; // given;
        distance[src] = 0;
        while (!st.empty())
        {
            int node = st.top();
            st.pop();

            for (auto it : adj[node])
            {
                int v = it.first;
                int wt = it.second;

                if (distance[node] + wt < distance[v])
                {
                    distance[v] = distance[node] + wt;
                }
            }
        }
        for (int i = 0; i < N; i++)
        {
            if (distance[i] == 1e9)
            {
                distance[i] = -1;
            }
        }

        return distance;
    }
};


int main()
{
    int t;
    cin >> t;
    while (t--)
    {
        int n, m;
        cin >> n >> m;
        vector<vector<int>> edges;
        for (int i = 0; i < m; ++i)
        {
            vector<int> temp;
            for (int j = 0; j < 3; ++j)
            {
                int x;
                cin >> x;
                temp.push_back(x);
            }
            edges.push_back(temp);
        }
        Solution obj;
        vector<int> res = obj.shortestPath(n, m, edges);
        for (auto x : res)
        {
            cout << x << " ";
        }
        cout << "\n";
    }
}

