const path = require('path');

exports.createPages = async ({actions, graphql, reporter}) => {
    const { createPage } = actions;

    const getAllDir = await graphql(
        `{
            allMdx {
                group(field: frontmatter___directory) {
                  totalCount
                  fieldValue
                }
              }
        }`
    )

    const getAllCategory = await graphql(
        `{
            allMdx {
                group(field: frontmatter___category) {
                  totalCount
                  fieldValue
                }
              }
        }`
    )

    let pageSize = 3;
    const ListTemplate = path.resolve(__dirname, 'src/pages/more/index.js')

    for(let dir of getAllDir.data.allMdx.group){
        const totalPage = Math.ceil(dir.totalCount / pageSize);
        for(let index = 1; index <= totalPage; index++){
            createPage({
                path: `/more/${dir.fieldValue}/${index}`,
                component: ListTemplate,
                context: {
                    directory: `${dir.fieldValue}`,
                    skip: pageSize * (index - 1),
                    totalPage,
                    currentPage: index
                }
            })
         }
    }

    for(let category of getAllCategory.data.allMdx.group){
        const totalPage = Math.ceil(category.totalCount / pageSize);
        for(let index = 1; index <= totalPage; index++){
            createPage({
                path: `/more/${category.fieldValue}/${index}`,
                component: ListTemplate,
                context: {
                    category: `${category.fieldValue}`,
                    skip: pageSize * (index - 1),
                    totalPage,
                    currentPage: index
                }
            })
         }
    }

}

