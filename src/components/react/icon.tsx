import React from "react";
import * as Icons from "react-icons/tb";

type Props = {
	iconName: string;
};

const ReactIcon = ({ iconName, ...props }: Props) => {
	const Icon = Icons[iconName as keyof typeof Icons];

	if (!Icon) {
		return <div>Icon "{iconName}" not found</div>;
	}

	return <Icon size={32} {...props} />;
};

export default ReactIcon;

