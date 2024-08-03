#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    void dfs(int ini_row, int ini_col, vector<vector<char>> &board,
             vector<vector<int>> &visited, vector<pair<int, int>> &directions)
    {
        // char curr_val = board[ini_row][ini_col];
        visited[ini_row][ini_col] = 1;
        int n = board.size();
        int m = board[0].size();

        for (auto &dir : directions)
        {
            int neigh_row = ini_row + dir.first;
            int neigh_col = ini_col + dir.second;

            if (neigh_row >= 0 && neigh_row < n && neigh_col >= 0 &&
                neigh_col < m && board[neigh_row][neigh_col] == 'O' &&
                visited[neigh_row][neigh_col] == 0)
            {
                dfs(neigh_row, neigh_col, board, visited, directions);
            }
        }
    }
    void solve(vector<vector<char>> &board)
    {
        int n = board.size();
        int m = board[0].size();
        vector<pair<int, int>> directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        vector<vector<int>> visited(n, vector<int>(m, 0));

        for (int j = 0; j < m; j++)
        {
            // for first row (top boundary)
            if (board[0][j] == 'O' && visited[0][j] == 0)
            {
                dfs(0, j, board, visited, directions);
            }
            // for last row (bottom boundary)
            if (board[n - 1][j] == 'O' && visited[n - 1][j] == 0)
            {
                dfs(n - 1, j, board, visited, directions);
            }
        }

        for (int i = 0; i < n; i++)
        {
            // for left column (left boundary)
            if (board[i][0] == 'O' && visited[i][0] == 0)
            {
                dfs(i, 0, board, visited, directions);
            }
            // for right column (right boundary)
            if (board[i][m - 1] == 'O' && visited[i][m - 1] == 0)
            {
                dfs(i, m - 1, board, visited, directions);
            }
        }

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < m; j++)
            {
                if (visited[i][j] != 1 && board[i][j] == 'O')
                {
                    board[i][j] = 'X';
                    visited[i][j] = 1;
                }
            }
        }
    }
};

int main()
{
    return 0;
}