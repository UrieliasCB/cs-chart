import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AreaGraph.css";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { CategoricalChartState } from "recharts/types/chart/generateCategoricalChart";

interface IProps {
	data: Array<{
		name: string;
		value: number;
	}>;
}

const CustomTooltip = ({
	active,
	payload,
	label,
}: {
	active?: any;
	payload?: any;
	label?: any;
}) => {
	if (active && payload && payload.length) {
		return (
			<div className="custom-tooltip">
				<svg
					width="143px"
					height="68px"
					viewBox="0 0 143 68"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M71.4958 67.2928L53.3304 49.3367L53.1843 49.1923H52.9789H10C4.7533 49.1923 0.5 44.939 0.5 39.6923V10C0.5 4.7533 4.7533 0.5 10 0.5H133C138.247 0.5 142.5 4.7533 142.5 10V39.6923C142.5 44.939 138.247 49.1923 133 49.1923H89.5904H89.3815L89.2347 49.3409L71.4958 67.2928Z"
						fill="url(#paint0_linear_4229_20606)"
						fill-opacity="0.4"
						stroke="url(#paint1_linear_4229_20606)"
					/>
					<defs>
						<linearGradient
							id="paint0_linear_4229_20606"
							x1="71.5"
							y1="0"
							x2="71.5"
							y2="68"
							gradientUnits="userSpaceOnUse"
						>
							<stop stop-color="#514379" />
							<stop offset="1" stop-color="#13111A" />
						</linearGradient>
						<linearGradient
							id="paint1_linear_4229_20606"
							x1="71.5"
							y1="0"
							x2="71.5"
							y2="68"
							gradientUnits="userSpaceOnUse"
						>
							<stop stop-color="white" />
							<stop offset="1" stop-color="white" stop-opacity="0" />
						</linearGradient>
					</defs>
				</svg>
				<div>
					<p>{`${payload[0].value} / ${label}`}</p>
				</div>
			</div>
		);
	}

	return null;
};

const AreaGraph = ({ data }: IProps) => {
	const [points, setPoints] = useState<Array<{ x: number; y: number }>>();
	const [coords, setCoords] = useState<{ x: number; y: number }>();

	const updateIndex = (chart: CategoricalChartState) => {
		let i = chart.activeTooltipIndex;
		if (!i) {
			setCoords(undefined);
			return;
		}
		if (!points) return;
		setCoords({ x: points[i].x, y: points[i].y });
	};

	return (
		<ResponsiveContainer width="100%" height="100%">
			<AreaChart
				data={data}
				margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
				onMouseMove={(chart) => updateIndex(chart)}
				onMouseLeave={() => setCoords(undefined)}
			>
				<defs>
					<linearGradient id="inner-gradient" gradientTransform="rotate(90)">
						<stop offset="0" stopColor="#3370f5" />
						<stop offset="1" stopColor="#ee5aa2" />
					</linearGradient>
				</defs>
				<XAxis hide dataKey="name" />
				<Tooltip
					content={<CustomTooltip />}
					cursor={false}
					isAnimationActive={false}
					wrapperStyle={{ display: coords ? "inline" : "none" }}
					position={coords ? coords : { x: 0, y: 0 }}
				/>
				<Area
					activeDot={false}
					type="linear"
					dataKey="value"
					stroke="#fff"
					strokeWidth={2}
					fillOpacity={1}
					fill="url(#inner-gradient)"
					onMouseOver={(data: any) => {
						if (!points) setPoints(data.points);
					}}
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
};

AreaGraph.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			value: PropTypes.number,
		}).isRequired
	).isRequired,
};

export default AreaGraph;