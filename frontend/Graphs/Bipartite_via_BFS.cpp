#include <bits/stdc++.h>
using namespace std;
class Solution
{
public:
    bool bfs(int ini_node, vector<int> &color, vector<vector<int>> &graph)
    {
        int initial_color = 0;
        queue<int> nodeQueue;
        nodeQueue.push(ini_node);
        color[ini_node] = initial_color;
        while (!nodeQueue.empty())
        {
            int node = nodeQueue.front();
            nodeQueue.pop();

            for (auto it : graph[node])
            {
                // if the adjacent node id yet not coloured
                // i will give the opposite colour of current node to adjacent nodes
                if (color[it] == -1)
                {
                    color[it] = !color[node];
                    nodeQueue.push(it);
                }
                // is the adjacent guy having the same color?
                // if True then that means Someone did color it on some other path.
                else if (color[it] == color[node])
                {
                    return false;
                }
            }
        }
        return true;
    }
    bool isBipartite(vector<vector<int>> &graph)
    {
        int V = graph.size();
        vector<int> color(V, -1);

        for (int i = 0; i < V; i++)
        {
            if (color[i] == -1)
            {
                if (bfs(i, color, graph) == false)
                {
                    return false;
                }
            }
        }
        return true;
    }
};
int main()
{
    return 0;
}