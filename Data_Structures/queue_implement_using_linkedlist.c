#include <stdio.h>
#include <stdlib.h>

struct node
{
    int data;
    struct node *link;
};

struct node *f, *r;

main()
{
    createQueue();
    display();

    insert();
    display();

    delete();
    display();

    return 0;
}

void createQueue()
{
    int ch;
    struct node *y, *z;
    y = (struct node *)malloc(sizeof(struct node));
    printf("Enter data of y: ");
    scanf("%d", &y->data);

    f = r = y;

    do
    {
        z = (struct node *)malloc(sizeof(struct node));
        printf("Enter data of z: ");
        scanf("%d", &z->data);

        r->link = z;
        r = z;

        printf("Do you want more node press '0/1': ");
        scanf("%d", &ch);
    } while (ch == 1);
    r->link = NULL;
}

void display()
{
    struct node *temp = f;
    printf("\nQueue elements are: ");
    while (temp != NULL)
    {
        printf("%d ", temp->data);
        temp = temp->link;
    }

    printf("\nf = %d", f->data);
    printf("\nr = %d", r->data);
    printf("\n");
}

void insert()
{
    struct node *temp;
    temp = (struct node *)malloc(sizeof(struct node));
    printf("Enter data to insert: ");
    scanf("%d", &temp->data);
    temp->link = NULL;

    if (r == NULL)
    {
        f = r = temp;
    }
    else
    {
        r->link = temp;
        r = temp;
    }
}

void delete()
{
    struct node *temp;

    if (f == NULL)
    {
        printf("Queue is empty.\n");
    }
    else
    {
        temp = f;
        f = f->link;
        free(temp);
    }
}
