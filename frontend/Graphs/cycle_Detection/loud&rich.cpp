#include <bits/stdc++.h>
using namespace std;

class Solution
{
private:
    int dfs(int node, vector<vector<int>> &adj, vector<int> &quiet,
            vector<int> &answer)
    {
        // If we've already found the answer for this node, return it
        if (answer[node] != -1)
        {
            return answer[node];
        }

        // Otherwise, the answer is the node itself
        answer[node] = node;

        // For each neighbor of the node
        for (int neighbor : adj[node])
        {
            // If the quietness of the neighbor is less than the quietness of
            // the current answer
            if (quiet[dfs(neighbor, adj, quiet, answer)] <
                quiet[answer[node]])
            {
                // Update the answer
                answer[node] = answer[neighbor];
            }
        }

        return answer[node];
    }

public:
    vector<int> loudAndRich(vector<vector<int>> &richer, vector<int> &quiet)
    {
        int n = quiet.size();
        vector<vector<int>> adj(n);
        vector<int> answer(n, -1); // Initialize answer[i] to -1

        // Build the adjacency list
        for (auto &r : richer)
        {
            adj[r[1]].push_back(r[0]);
        }

        // Start DFS from each node
        for (int i = 0; i < n; i++)
        {
            dfs(i, adj, quiet, answer);
        }

        return answer;
    }
};

int main()
{
}