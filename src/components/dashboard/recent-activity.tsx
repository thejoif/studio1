import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MOCK_ACTIVITY } from '@/lib/mock-data';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export function RecentActivity() {
    const activities = MOCK_ACTIVITY;

    return (
        <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
                <CardTitle className="font-headline">Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {activities.map((activity, index) => (
                        <div key={activity.id} className="flex items-start">
                            <div className="flex-shrink-0">
                                <div className="h-3 w-3 rounded-full bg-primary mt-1.5" />
                                {index < activities.length - 1 && (
                                    <div className="h-12 w-px bg-border ml-[5.5px]" />
                                )}
                            </div>
                            <div className="ml-4">
                                <p className="font-medium text-foreground">{activity.description}</p>
                                <p className="text-sm text-muted-foreground">
                                    {formatDistanceToNow(activity.timestamp, { addSuffix: true, locale: es })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
