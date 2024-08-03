#include <bits/stdc++.h>
using namespace std;
class Solution
{
public:
    int orangesRotting(vector<vector<int>> &grid)
    {
        int n = grid.size();
        int m = grid[0].size();

        // <{{r,c},t}>
        queue<pair<pair<int, int>, int>> nodeQueue;
        vector<vector<int>> visited(n, vector<int>(m, 0));
        int count_fresh = 0;
        int count_rotten = 0;
        int final_time = 0;
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < m; j++)
            {
                if (grid[i][j] == 2)
                {
                    nodeQueue.push({{i, j}, 0});
                    visited[i][j] = 2;
                }
                if (grid[i][j] == 1)
                {
                    count_fresh++;
                }
            }
        }
        vector<pair<int, int>> directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!nodeQueue.empty())
        {
            int curr_row = nodeQueue.front().first.first;
            int curr_col = nodeQueue.front().first.second;
            int time = nodeQueue.front().second;
            nodeQueue.pop();
            final_time = max(time, final_time);
            for (auto &dir : directions)
            {
                int neigh_row = curr_row + dir.first;
                int neigh_col = curr_col + dir.second;

                if (neigh_row >= 0 && neigh_row < n && neigh_col >= 0 && neigh_row < m && visited[neigh_row][neigh_col] == 0 && grid[neigh_row][neigh_col] == 1)
                {
                    nodeQueue.push({{neigh_row, neigh_col}, time + 1});
                    visited[neigh_row][neigh_col] = 2;
                    count_rotten++;
                }
            }
        }

        if (count_fresh != count_rotten)
        {
            return -1;
        }
        return final_time;
    }
};
int main()
{
    return 0;
}