#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    vector<vector<int>> updateMatrix(vector<vector<int>> &mat)
    {
        int n = mat.size();
        int m = mat[0].size();

        vector<vector<int>> visited(n, vector<int>(m, -1));
        vector<pair<int, int>> directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        queue<pair<pair<int, int>, int>> nodeQueue;

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < m; j++)
            {
                if (mat[i][j] == 0)
                {
                    visited[i][j] = 0;
                    nodeQueue.push({{i, j}, 0});
                }
            }
        }

        while (!nodeQueue.empty())
        {
            int curr_row = nodeQueue.front().first.first;
            int curr_col = nodeQueue.front().first.second;
            int dist = nodeQueue.front().second;

            nodeQueue.pop();

            for (auto &dir : directions)
            {
                int neigh_row = curr_row + dir.first;
                int neigh_col = curr_col + dir.second;

                if (neigh_row >= 0 && neigh_row < n && neigh_col >= 0 &&
                    neigh_col < m && mat[neigh_row][neigh_col] == 1 &&
                    visited[neigh_row][neigh_col] == -1)
                {

                    nodeQueue.push({{neigh_row, neigh_col}, dist + 1});
                    visited[neigh_row][neigh_col] = dist + 1;
                }
            }
        }
        return visited;
    }
};

int main()
{
    return 0;
}
