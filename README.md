# Blog

## About

Hi there, I'm Vahram,

This is my [digital garden](https://maggieappleton.com/garden-history?ref=ideasurg.pub), my notes on the internet. I started them in late 2021 from some university notes I took in Jupyter Notebooks (and from some online material I learned in my free time). While this is generally not intended as original work (and I will do my best to communicate that and cite my sources), I would like to have a say in how my work (the work that *is* original) is used. Please refer to the copyright section for more details. Recently, I started trying out various static page generators (such as fast.io and [quarto](https://github.com/quarto-dev)) to convert my notes into a form that looks presentable in a browser.

### Contribution Notes for Self

#### Adding posts
Contribute posts in the `blog/posts/<subject_area>/` directory in `.ipynb` format (`.qmd` is also supported and is more feature-rich).

#### Adding images to posts

1. Make two images named `<img_name>.light.png` and `.dark` respectively. Here are some of the colors used on the page (for quick reference):

    | Theme | Colors               |
    |-------|----------------------|
    | light | `bg-primary` #EBE8E7 |
    |       | `highlights` #EF767A |
    |       | `stroke` #000000     |
    | dark  | `bg-primary` #191516 |
    |       | `highlights` #EF767A |
    |       | `stroke` #EBE8E7     |

2. In your document, refer to the `.light` version of the image.
3. (Temporary hack)) Include the `.dark` version in a hidden markdown cell at the very bottom of the document for quarto to load it in as a resource upon `render`.
   3.1 Set the height of the included `.dark` images to `0`. #TODO there is support for this use case in quarto, look up how...

    For example:
    ```markdown
    ![](../../assets/linear_algebra/linear_algebra_refresher_for_optimization/convex.dark.png){height=0}
    ```

#### Rendering Website

From the root directory, issue:

```bash
quarto render [--cache-refresh]
```
Then:
```bash
quarto preview
```

#### Publishing

To publish to [v-poghosyan.github.io](https://v-poghosyan.github.io/), use:

```
quarto publish
```



