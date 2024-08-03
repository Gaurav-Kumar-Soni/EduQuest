#include <bits/stdc++.h>
using namespace std;
class Solution
{
public:
    vector<vector<int>> floodFill(vector<vector<int>> &image, int sr, int sc, int color)
    {

        int n = image.size();
        int m = image[0].size();
        vector<vector<int>> visited(n, vector<int>(m, 0));

        queue<pair<int, int>> nodeQueue;

        nodeQueue.push({sr, sc});
        vector<pair<int, int>> directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        int curr_color = image[sr][sc];
        while (!nodeQueue.empty())
        {
            int curr_row = nodeQueue.front().first;
            int curr_col = nodeQueue.front().second;

            image[curr_row][curr_col] = color;
            nodeQueue.pop();

            for (auto &dir : directions)
            {
                int neigh_row = curr_row + dir.first;
                int neigh_col = curr_col + dir.second;

                if (neigh_row >= 0 && neigh_row < n && neigh_col >= 0 &&
                    neigh_col < m &&
                    image[neigh_row][neigh_col] == curr_color &&
                    !visited[neigh_row][neigh_col])
                {
                    visited[neigh_row][neigh_col] = 1;
                    nodeQueue.push({neigh_row, neigh_col});
                }
            }
        }
        return image;
    }
};
int main()
{
    return 0;
}