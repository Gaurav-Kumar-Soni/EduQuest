// GFG :- []https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1?utm_source=geeksforgeeks&utm_medium=article_practice_tab&utm_campaign=article_practice_tab

#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    int spanningTree(int V, vector<vector<int>> adj[])
    {
        // Note: here the problem asked just for Sum of wts of MST, if they ask for MST full tree graph
        // then store parent node also and the ds will be like this :- {wt,{node, parentNode}}

        // below ds is : {wt, Node}
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> nodeQueue;
        vector<int> visited(V, 0);
        nodeQueue.push({0, 0});
        int sum = 0;

        while (!nodeQueue.empty())
        {
            auto it = nodeQueue.top();
            nodeQueue.pop();

            int node = it.second;
            int wt = it.first;

            if (visited[node] == 1)
                continue;
            // if ask for MST graph then add here (Node and P_Node) pairs in MST vector;
            visited[node] = 1;

            sum = sum + wt;

            for (auto it : adj[node])
            {
                int adjNode = it[0];
                int edgeWt = it[1];

                if (!visited[adjNode])
                {
                    nodeQueue.push({edgeWt, adjNode});
                }
            }
        }

        return sum;
    }
};

int main()
{
    return 0;
}
