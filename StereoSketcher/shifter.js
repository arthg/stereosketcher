function shiftIn()
{
	var dots = getDots();
	var dot;
	for(var ii=0;ii<dots.length;ii++)
	{
		dot = dots[ii];
		if(dot.isSelected())
		{
			dot.shift+=shiftDist;
			applyShift(dot);
		}
	}
}

function shiftOut()
{
	var dots = getDots();
	var dot;
	for(var ii=0;ii<dots.length;ii++)
	{
		dot = dots[ii];
		if(dot.isSelected())
		{
			dot.shift-=shiftDist;
			applyShift(dot);
		}
	}
}

function applyShift(dot)
{
	var lines = dot.lines;
	var line;
	for(var ii=0;ii<lines.length;ii++)
	{
		line = lines[ii];
		if(line.dot1 == dot)
		{
			line.clone.setAttribute("x1",parseInt(line.dot1.getAttribute("cx"))+IPD+dot.shift);
		}
		else if (line.dot2 == dot) 
		{
			line.clone.setAttribute("x2",parseInt(line.dot2.getAttribute("cx"))+IPD+dot.shift);
		}
	}
	faces = dot.faces;
	for(var ik=0;ik<faces.length;ik++)
	{
		face = faces[ik];
		if(face.dot1 == dot)
		{
			facex1 = dot.getAttribute("cx");
			facey1 = dot.getAttribute("cy");
			facex2 = face.dot2.getAttribute("cx");
			facey2 = face.dot2.getAttribute("cy");
			facex3 = face.dot3.getAttribute("cx");
			facey3 = face.dot3.getAttribute("cy");
			cloneCoord = (parseInt(facex1)+IPD+face.dot1.shift)+","+facey1+" "+(parseInt(facex2)+face.dot2.shift+IPD)+","+facey2+" "+(parseInt(facex3)+face.dot3.shift+IPD)+","+facey3;
			face.clone.setAttribute("points",cloneCoord);
		}
		if(face.dot2 == dot)
		{
			facex1 = face.dot1.getAttribute("cx");
			facey1 = face.dot1.getAttribute("cy");
			facex2 = dot.getAttribute("cx");
			facey2 = dot.getAttribute("cy");
			facex3 = face.dot3.getAttribute("cx");
			facey3 = face.dot3.getAttribute("cy");
			cloneCoord = (parseInt(facex1)+IPD+face.dot1.shift)+","+facey1+" "+(parseInt(facex2)+face.dot2.shift+IPD)+","+facey2+" "+(parseInt(facex3)+face.dot3.shift+IPD)+","+facey3;
			face.clone.setAttribute("points",cloneCoord);
		}
		if(face.dot3 == dot)
		{
			facex1 = face.dot1.getAttribute("cx");
			facey1 = face.dot1.getAttribute("cy");
			facex2 = face.dot2.getAttribute("cx");
			facey2 = face.dot2.getAttribute("cy");
			facex3 = dot.getAttribute("cx");
			facey3 = dot.getAttribute("cy");
			cloneCoord = (parseInt(facex1)+IPD+face.dot1.shift)+","+facey1+" "+(parseInt(facex2)+face.dot2.shift+IPD)+","+facey2+" "+(parseInt(facex3)+face.dot3.shift+IPD)+","+facey3;
			face.clone.setAttribute("points",cloneCoord);
		}
	}
	dot.label.textContent = dot.shift/shiftDist;
}