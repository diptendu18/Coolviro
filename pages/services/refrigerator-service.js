import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import { getServiceBySlug } from '@/data/services';

const service = getServiceBySlug('refrigerator-service');

export default function RefrigeratorServicePage() {
  return <ServicePageTemplate service={service} />;
}
