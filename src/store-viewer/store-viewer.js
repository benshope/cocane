import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const StoreViewerDIV = styled.div`
	position: relative;
	overflow: hidden;
	word-break: break-all;
`;

const ConnectedStoreViewer = connect(state => ({ ...state }))(state => (
	<StoreViewerDIV>
		<pre>{JSON.stringify(state, null, 4)}</pre>
	</StoreViewerDIV>
));

export default ConnectedStoreViewer;
