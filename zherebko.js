// Compute a zherebko layout for a dag assigning each node an x and y
// coordinate, and optionally assigning each link a points field with the x and
// y coordinates for intermediary stops on the edge.
import greedy from './greedy'

export default function() {
    let width = 1
    let height = 1
    let indexer = greedy()

    function zherebko(dag) {
        console.log('\n\n\n\n\n\n\n\n\n\n\ndag', JSON.stringify(dag, null, 2))
        // Topological Sort
        const ordered = []
        dag.eachBefore((node, i) => {
            node.layer = i
            ordered.push(node)
        })
        console.log(
            '\n\n\n\n\n\n\n\n\n\n\nordered',
            JSON.stringify([...ordered], null, 2)
        )

        // Get indices
        indexer(ordered)
        console.log(
            '\n\n\n\n\n\n\n\n\n\n\nindexed',
            JSON.stringify([...ordered], null, 2)
        )

        // Map to coordinates
        let minIndex = 0
        let maxIndex = 0
        dag.eachLinks(({ data }) => {
            minIndex = Math.min(minIndex, data.index)
            maxIndex = Math.max(maxIndex, data.index)
        })
        let maxLayer = ordered.length - 1
        dag.each(node => {
            node.x = (-minIndex / (maxIndex - minIndex)) * width
            node.y = (node.layer / maxLayer) * height
        })
        dag.eachLinks(({ source, target, data }) => {
            const points = [{ x: source.x, y: source.y }]

            const x = ((data.index - minIndex) / (maxIndex - minIndex)) * width
            const y1 = ((source.layer + 1) / maxLayer) * height
            const y2 = ((target.layer - 1) / maxLayer) * height
            if (target.layer - source.layer === 2) {
                points.push({ x: x, y: y1 })
            } else if (target.layer - source.layer > 2) {
                points.push({ x: x, y: y1 }, { x: x, y: y2 })
            }

            points.push({ x: target.x, y: target.y })
            data.points = points
        })
        return dag
    }

    zherebko.size = function(x) {
        return arguments.length
            ? (([width, height] = x), zherebko)
            : [width, height]
    }

    return zherebko
}
