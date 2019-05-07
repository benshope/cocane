import React, { useState, useRef, useLayoutEffect } from 'react'
import { zherebko, dagConnect } from 'd3-dag'
const d3 = require('d3')

const exampleDAG = [
	['Eve', 'Cain'],
	['Eve', 'Seth'],
	['Seth', 'Enos'],
	['Seth', 'Noam'],
	['Eve', 'Abel'],
	['Eve', 'Awan'],
]

function RenderNodes(props) {
	const { width, height, nodeRadius, layout, dag } = props
	const svgRef = useRef(null)
	const renderGraph = useLayoutEffect(() => {
		console.log('TRYING TO RENDER', svgRef.current, props)
		const svgNode = svgRef.current
		const nodeRadius = 20
		const svgSelection = d3.select(svgNode)
		const defs = svgSelection.append('defs') // For gradients
		// Use computed layout
		layout(dag)
		const steps = dag.size()
		const interp = d3.interpolateRainbow
		const colorMap = {}
		dag.each((node, i) => {
			colorMap[node.id] = interp(i / steps)
		})
		// How to draw edges
		const line = d3
			.line()
			.curve(d3.curveMonotoneX)
			.x(d => d.y)
			.y(d => d.x)
		// Plot edges
		svgSelection
			.append('g')
			.selectAll('path')
			.data(dag.links())
			.enter()
			.append('path')
			.attr('d', ({ data }) => line(data.points))
			.attr('fill', 'none')
			.attr('stroke-width', 3)
			.attr('stroke', ({ source, target }) => {
				const gradId = `${source.id}-${target.id}`
				const grad = defs
					.append('linearGradient')
					.attr('id', gradId)
					.attr('gradientUnits', 'userSpaceOnUse')
					.attr('x1', source.y)
					.attr('x2', target.y)
					.attr('y1', source.x)
					.attr('y2', target.x)
				grad.append('stop')
					.attr('offset', '0%')
					.attr('stop-color', colorMap[source.id])
				grad.append('stop')
					.attr('offset', '100%')
					.attr('stop-color', colorMap[target.id])
				return `url(#${gradId})`
			})
		// Select nodes
		const nodes = svgSelection
			.append('g')
			.selectAll('g')
			.data(dag.descendants())
			.enter()
			.append('g')
			.attr('transform', ({ x, y }) => `translate(${y}, ${x})`)
		// Plot node circles
		nodes
			.append('circle')
			.attr('r', 20)
			.attr('fill', n => colorMap[n.id])
		// Add text to nodes
		nodes
			.append('text')
			.text(d => d.id)
			.attr('font-weight', 'bold')
			.attr('font-family', 'sans-serif')
			.attr('text-anchor', 'middle')
			.attr('alignment-baseline', 'middle')
			.attr('fill', 'white')
		return () => {
			// Clean up the subscription
			subscription.unsubscribe()
		}
	})

	return (
		<svg
			width={width}
			height={height}
			ref={svgRef}
			viewbox={`${-nodeRadius} ${-nodeRadius} ${width +
				2 * nodeRadius} ${height + 2 * nodeRadius}`}
		/>
	)
}

function Layout() {
	const width = 400
	const height = 400
	const nodeRadius = 10
	// dispatchGetCell

	const dag = dagConnect()(exampleDAG)
	const layout = zherebko().size([height, width])
	return <RenderNodes {...{ width, height, nodeRadius, layout, dag }} />
}

export default Layout
