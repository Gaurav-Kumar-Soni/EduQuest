#include <bits/stdc++.h>
using namespace std;
class Solution
{
public:
    int ladderLength(string beginWord, string endWord, vector<string> &wordList)
    {
        queue<pair<string, int>> wordQueue;
        wordQueue.push({beginWord, 1});
        unordered_set<string> st(wordList.begin(), wordList.end());

        st.erase(beginWord);

        while (!wordQueue.empty())
        {
            string word = wordQueue.front().first;
            int steps = wordQueue.front().second;
            wordQueue.pop();
            if (word == endWord)
                return steps;

            for (int i = 0; i < word.size(); i++)
            {
                char original = word[i];

                for (char ch = 'a'; ch <= 'z'; ch++)
                {
                    word[i] = ch;
                    // it exists in the set
                    if (st.find(word) != st.end())
                    {
                        st.erase(word);
                        wordQueue.push({word, steps + 1});
                    }
                }
                word[i] = original;
            }
        }
        return 0;
    }
};
int main()
{
    return 0;
}