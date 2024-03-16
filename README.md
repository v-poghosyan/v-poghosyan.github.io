# Vahram - Personal Blog

## Adding posts
Contribute posts in the `blog/posts/<subject_area>/` directory in `.ipynb` format.

## Adding images

1. Make two images named `<img_name>.light.png` and .dark respectively. Here are the color codes for reference:

    | Theme | Colors               |
    |-------|----------------------|
    | light | `bg-primary` #EBE8E7 |
    |       | `highlights` #EF767A |
    |       | `stroke` #000000     |
    | dark  | `bg-primary` #191516 |
    |       | `highlights` #EF767A |
    |       | `stroke` #EBE8E7     |

2. In the document, reference the `.light` version of the image.
3. Include the `.dark` version in a hidden markdown cell at the end of the document for quarto to load it as a resource on render.
4. Set the height of the included .dark images to 0.

    For example:
    ```markdown
    ![](../../assets/linear_algebra/linear_algebra_refresher_for_optimization/convex.dark.png){height=0}
    ```

## Rendering

Navigate to `/blog` subdirectory:

Use:
```bash
quarto render --cache-refresh
```

Then:
```bash
quarto preview
```



