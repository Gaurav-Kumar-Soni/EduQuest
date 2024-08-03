#include<bits/stdc++.h>
using namespace std;

class Solution
{
public:
    // using Disjoint Set Approch

    class DisjointSet
    {
        vector<int> rank, parent, size;

    public:
        DisjointSet(int n)
        {
            rank.resize(n + 1, 0);
            parent.resize(n + 1);
            size.resize(n + 1);
            for (int i = 0; i <= n; i++)
            {
                parent[i] = i;
                size[i] = 1;
            }
        }

        int findUPar(int node)
        {
            if (node == parent[node])
                return node;
            return parent[node] = findUPar(parent[node]);
        }

        void unionBySize(int u, int v)
        {
            int ulp_u = findUPar(u);
            int ulp_v = findUPar(v);
            if (ulp_u == ulp_v)
                return;
            if (size[ulp_u] < size[ulp_v])
            {
                parent[ulp_u] = ulp_v;
                size[ulp_v] += size[ulp_u];
            }
            else
            {
                parent[ulp_v] = ulp_u;
                size[ulp_u] += size[ulp_v];
            }
        }
    };
    int findCircleNum(vector<vector<int>> &isConnected)
    {

        int V = isConnected.size();
        DisjointSet ds(V);

        for (int i = 0; i < V; i++)
        {
            for (int j = 0; j < V; j++)
            {
                if (isConnected[i][j] == 1)
                {
                    ds.unionBySize(i, j);
                }
            }
        }
        // concept: total number provinces  = total number of BOSSes (means total Ultimate parents)
        // so the ultimate parents are the one which are the Ultimate parents of itself..
        // only Ultimate parents are the Ultimate parents of itself..
        // so count the number of Nodes which are Ultimate parent of itself to find the total number of BOSSes.
        int count = 0;
        for (int i = 0; i < V; i++)
        {
            if (ds.findUPar(i) == i)
            {
                count++;
            }
        }
        return count;
    }
};