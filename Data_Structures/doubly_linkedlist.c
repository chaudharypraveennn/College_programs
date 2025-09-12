#include <stdio.h>
#include <stdlib.h>

int main()
{
    void create();
    // void insert();
    void traverse();
    create();
    traverse();
    // insert();
    traverse();
    return 0;
}

struct node
{
    int info;
    struct node *prev;
    struct node *next;
};
struct node *first;

void create()
{
    struct node *ptr, *cpt;
    int num;

    ptr = (struct node *)malloc(sizeof(struct node));

    printf("Enter info of ptr: ");
    scanf("%d", &ptr->info);

    ptr->prev = NULL;
    first = ptr;

    do
    {
        cpt = (struct node *)malloc(sizeof(struct node));

        printf("Enter info of cpt: ");
        scanf("%d", &cpt->info);

        ptr->next = cpt;
        cpt->prev = ptr;
        ptr = cpt;

        printf("Do you want more node press '0/1': ");
        scanf("%d", &num);
    } while (num == 1);
    ptr->next = NULL;
}

// void traverse()
// {
//     struct node *z;
//     z = first;

//     while (z != NULL)
//     {
//         printf("%d\t%d\n", z->info, z->link);
//         z = z->link;
//     }
// }
