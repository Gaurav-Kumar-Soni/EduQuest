#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    void dfs(int node, vector<vector<int>> &isConnected, vector<bool> &visited)
    {
        visited[node] = true;

        for (int it = 0; it < isConnected[node].size(); it++)
        {
            if (isConnected[node][it] == 1 && visited[it] == false)
            {
                dfs(it, isConnected, visited);
            }
        }
    }
    int findCircleNum(vector<vector<int>> &isConnected)
    {
        int n = isConnected.size();
        vector<bool> visited(n + 1, false);
        int count = 0;
        for (int i = 0; i < n; i++)
        {
            if (visited[i] != true)
            {
                count++;
                dfs(i, isConnected, visited);
            }
        }
        return count;
    }
};

int main()
{
    return 0;
}