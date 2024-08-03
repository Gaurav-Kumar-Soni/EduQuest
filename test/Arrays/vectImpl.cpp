#include <iostream>
using namespace std;

class Vec
{
public:
    int *vect;
    int size;
    int capacity;
    Vec()
    {
        vect = vec_fun();
        size = 0;
        capacity = 1;
    }

    int *vec_fun()
    {
        int *ptr = new int[1];
        return ptr;
    }

    void resize()
    {
        int *ptr2 = new int[capacity * 2];
        for (int i = 0; i < size; i++)
        {
            ptr2[i] = vect[i];
        }
        capacity = capacity * 2;
        free(vect);
        vect = ptr2;
    }
    void push(int x)
    {
        if (size == capacity)
        {
            resize();
        }
        vect[size++] = x;
    }
};

int main()
{
    Vec v;

    v.push(34);
    v.push(23);
    v.push(25);
    v.push(27);
    v.push(29);
    v.push(78);

    for (int i = 0; i < v.size; i++)
    {
        cout << v.vect[i]<<" ";
    }

    return 0;
}