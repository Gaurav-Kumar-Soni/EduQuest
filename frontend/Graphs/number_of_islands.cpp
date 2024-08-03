#include <bits/stdc++.h>
using namespace std;
class Solution
{
public:
    void bfs(int row, int col, vector<vector<char>> &grid, vector<vector<int>> &visited)
    {
        visited[row][col] = 1;
        queue<pair<int, int>> nodeQueue;
        nodeQueue.push({row, col});
        int n = grid.size();
        int m = grid[0].size();
        vector<pair<int, int>> directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!nodeQueue.empty())
        {
            int current_row = nodeQueue.front().first;
            int current_col = nodeQueue.front().second;
            nodeQueue.pop();
            // traverse in its neighbours:--

            for (auto &dir : directions)
            {
                int neigh_row = current_row + dir.first;
                int neigh_col = current_col + dir.second;

                if (neigh_row >= 0 && neigh_row < n &&
                    neigh_col >= 0 && neigh_col < m &&
                    grid[neigh_row][neigh_col] == '1' &&
                    !visited[neigh_row][neigh_col])
                {
                    visited[neigh_row][neigh_col] = 1;
                    nodeQueue.push({neigh_row, neigh_col});
                }
            }
        }
    }
    int numIslands(vector<vector<char>> &grid)
    {
        int n = grid.size();
        int m = grid[0].size();

        vector<vector<int>> visited(n, vector<int>(m, 0));
        int count = 0;
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < m; j++)
            {
                if (visited[i][j] != 1 && grid[i][j] == '1')
                {
                    count++;
                    bfs(i, j, grid, visited);
                }
            }
        }
        return count;
    }
};
int main()
{
    return 0;
}