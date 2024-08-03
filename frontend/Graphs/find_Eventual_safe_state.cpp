#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:

    // All method are on LEETCODE Submission:-   https://leetcode.com/problems/find-eventual-safe-states/submissions/

    bool detect_cycle(int node, vector<int> &visited, vector<vector<int>> &graph, vector<int> &nodeIsInCycle)
    {

        visited[node] = 1;
        nodeIsInCycle[node] = 1; // Assume the node is part of a cycle

        // Iterate over all neighbors of the node
        for (auto it : graph[node])
        {
            if (visited[it] == 0)
            {
                if (detect_cycle(it, visited, graph, nodeIsInCycle) == true)
                {
                    return true; // If a cycle is detected in the recursion, return true
                }
            }
            // If the neighbor is visited and is part of a cycle, return true
            else if (nodeIsInCycle[it] == 1)
            {
                return true;
            }
        }
        // If no cycle is detected, mark the node as not part of a cycle
        nodeIsInCycle[node] = 0;
        return false; // Return false as no cycle is detected
    }

    vector<int> eventualSafeNodes(vector<vector<int>> &graph)
    {
        int V = graph.size();
        vector<int> visited(V, 0);
        vector<int> nodeIsInCycle(V, 0);
        vector<int> ans;

        for (int i = 0; i < V; i++)
        {
            if (visited[i] == 0)
            {
                detect_cycle(i, visited, graph, nodeIsInCycle);
            }
        }

        for (int i = 0; i < V; i++)
        {
            if (nodeIsInCycle[i] != 1)
            {
                ans.push_back(i);
            }
        }
        return ans;
    }
};
int main()
{
    return 0;
}