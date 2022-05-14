import { parse, print, types, prettyPrint } from "recast";
const {
    identifier: id,
    expressionStatement,
    memberExpression,
    assignmentExpression,
    arrowFunctionExpression,
    blockStatement,
    exportSpecifier,
    variableDeclaration, variableDeclarator, functionExpression } = types.builders

export default class ApiGenerator {
    // func构建器：生成request函数声明
    getFunctionDeclaration = () => {
        const code =
            `
            function add(a, b) {
            return a +
                // 有什么奇怪的东西混进来了
                b + "8"
            }
            `
        // 用螺丝刀解析机器
        const ast = parse(code);
        const add = ast.program.body[0]
        console.log(1, add)
        // 将准备好的组件置入模具，并组装回原来的ast对象。
        ast.program.body[0] = variableDeclaration("const", [
            variableDeclarator(add.id, functionExpression(
                null, // Anonymize the function expression.
                add.params,
                add.body
            ))
        ]);

        //将AST对象重新转回可以阅读的代码
        const output1 = print(ast).code;
        const output2 = prettyPrint(ast, { tabWidth: 2, quote: 'single' }).code
        console.log('output1', output1)
        console.log('output2', output2)
        const _blockStatement = blockStatement([])
        const _arraw = arrowFunctionExpression([], _blockStatement);
        // console.log(exportSpecifier(id('export'), blockStatement([])))
        console.log(assignmentExpression('=', id('add'), arrowFunctionExpression([], blockStatement([]))))
        const arrow = expressionStatement(assignmentExpression('=', memberExpression(id('exports'), id('add')),
                arrowFunctionExpression([], blockStatement([]))))
        const output3 = prettyPrint(arrow, { tabWidth: 2, quote: 'single' }).code
        console.log('output3', output3)
        // run(function (ast, printSource) {
        //     // 一个块级域 {}
        //     console.log(ast)
        //     console.log('\n\nstep1:')
        //     printSource(blockStatement([]))

        //     // 一个键头函数 ()=>{}
        //     console.log('\n\nstep2:')
        //     printSource(arrowFunctionExpression([], blockStatement([])))

        //     // add赋值为键头函数  add = ()=>{}
        //     console.log('\n\nstep3:')
        //     printSource(assignmentExpression('=', id('add'), arrowFunctionExpression([], blockStatement([]))))

        //     // exports.add赋值为键头函数  exports.add = ()=>{}
        //     console.log('\n\nstep4:')
        //     printSource(expressionStatement(assignmentExpression('=', memberExpression(id('exports'), id('add')),
        //         arrowFunctionExpression([], blockStatement([])))))
        // });
    }
}

const demo = new ApiGenerator()
demo.getFunctionDeclaration()