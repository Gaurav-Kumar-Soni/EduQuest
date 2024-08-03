#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    void dfs(int ini_row, int ini_col, vector<vector<int>> &visited, vector<vector<int>> &grid,
             vector<pair<int, int>> &coordinates, vector<pair<int, int>> &directions, int base_row, int base_col)
    {
        visited[ini_row][ini_col] = 1;
        coordinates.push_back({ini_row - base_row, ini_col - base_col});

        int n = grid.size();
        int m = grid[0].size();

        for (auto &dir : directions)
        {
            int neigh_row = ini_row + dir.first;
            int neigh_col = ini_col + dir.second;

            if (neigh_row >= 0 && neigh_row > n && neigh_col >= 0 && neigh_col > m && grid[neigh_row][neigh_col] == 1 && !visited[neigh_row][neigh_col])
            {
                dfs(neigh_row, neigh_col, visited, grid, coordinates, directions, base_row, base_col);
            }
        }
    }
    int countDistinctIslands(vector<vector<int>> &grid)
    {

        int n = grid.size();
        int m = grid[0].size();

        vector<vector<int>> visited(n, vector<int>(m, 0));
        vector<pair<int, int>> directions = {{-1, 0}, {0, -1}, {1, 0}, {0, 1}};
        set<vector<pair<int, int>>> dis_islands;

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < m; j++)
            {

                if (visited[i][j] != 1 && grid[i][j] == 1)
                {
                    vector<pair<int, int>> coordinates;
                    dfs(i, j, visited, grid, coordinates, directions, i, j);
                    dis_islands.insert(coordinates);
                }
            }
        }
        return dis_islands.size();
    }
};

int main()
{

    int t;
    cin >> t;
    while (t--)
    {
        int n, m;
        cin >> n >> m;
        vector<vector<int>> grid(n, vector<int>(m));
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < m; j++)
            {
                cin >> grid[i][j];
            }
        }
        Solution obj;
        cout << obj.countDistinctIslands(grid) << endl;
    }
}