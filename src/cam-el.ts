import { Hybrids } from "hybrids"

const CamEl: Hybrids<any> = {
	m: '0',
	p: '0',
	px: ({p}) => p.split(' ').length > 1 ? parseInt(p.split(' ')[0]) : parseInt(p),
	py: ({p}) => p.split(' ').length > 1 ? parseInt(p.split(' ')[1]) : parseInt(p),
	mx: ({m}) => m.split(' ').length > 1 ? parseInt(m.split(' ')[0]) : parseInt(m),
	my: ({m}) => m.split(' ').length > 1 ? parseInt(m.split(' ')[1]) : parseInt(m),
}

export default CamEl