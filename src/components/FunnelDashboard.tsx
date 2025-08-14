import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useFunnelAnalytics } from '@/hooks/useFunnelAnalytics';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw, TrendingUp, TrendingDown, Users, Eye, Mail, CheckCircle2, Video, BarChart3 } from 'lucide-react';

export const FunnelDashboard: React.FC = () => {
  const { metrics, records, loading, error, fetchAnalytics, getQuestionDropoffs, getTrafficSources, getCohortAnalysis } = useFunnelAnalytics();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Carregando analytics do funil...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 mb-4">Erro ao carregar dados: {error}</p>
        <Button onClick={fetchAnalytics}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Tentar Novamente
        </Button>
      </div>
    );
  }

  if (!metrics) return null;

  const questionDropoffs = getQuestionDropoffs();
  const trafficSources = getTrafficSources();
  const cohortData = getCohortAnalysis();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics do Funil de Conversão</h1>
        <Button onClick={fetchAnalytics} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Atualizar
        </Button>
      </div>

      {/* Main Funnel Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visitantes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalPageViews}</div>
            <p className="text-xs text-muted-foreground">Páginas visualizadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quiz Iniciado</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.quizStarted}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.conversionRates.pageToQuizStart.toFixed(1)}% dos visitantes
            </p>
            <Progress value={metrics.conversionRates.pageToQuizStart} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tela Email</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.emailScreenReached}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.conversionRates.quizToEmailScreen.toFixed(1)}% chegaram aqui
            </p>
            <Progress value={metrics.conversionRates.quizToEmailScreen} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Fornecido</CardTitle>
            <Mail className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.emailProvided}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.conversionRates.emailScreenToProvided.toFixed(1)}% preencheram
            </p>
            <Progress value={metrics.conversionRates.emailScreenToProvided} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quiz Completo</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.quizCompleted}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.conversionRates.emailToCompleted.toFixed(1)}% completaram
            </p>
            <Progress value={metrics.conversionRates.emailToCompleted} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resultado Visto</CardTitle>
            <Eye className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.resultViewed}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.conversionRates.completedToResultViewed.toFixed(1)}% viram resultado
            </p>
            <Progress value={metrics.conversionRates.completedToResultViewed} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VSL Clicada</CardTitle>
            <Video className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.vslClicked}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.conversionRates.resultToVslClick.toFixed(1)}% clicaram VSL
            </p>
            <Progress value={metrics.conversionRates.resultToVslClick} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Overall Conversion Rate */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Taxa de Conversão Geral
          </CardTitle>
          <CardDescription>Do visitante até o clique na VSL</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-green-600">
            {metrics.totalPageViews > 0 ? ((metrics.vslClicked / metrics.totalPageViews) * 100).toFixed(2) : '0.00'}%
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {metrics.vslClicked} de {metrics.totalPageViews} visitantes clicaram na VSL
          </p>
        </CardContent>
      </Card>

      {/* Question Dropoffs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Drop-off por Pergunta
          </CardTitle>
          <CardDescription>Onde as pessoas param no quiz</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {questionDropoffs.map((q, index) => (
              <div key={q.question} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">Pergunta {q.question}</Badge>
                  <span className="text-sm">{q.reached} usuários chegaram aqui</span>
                </div>
                {index > 0 && (
                  <div className="flex items-center space-x-2">
                    {q.dropoffRate > 0 ? (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    )}
                    <span className="text-sm font-medium">
                      {q.dropoffRate.toFixed(1)}% drop-off
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fontes de Tráfego</CardTitle>
            <CardDescription>De onde vêm os visitantes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trafficSources.map((source) => (
                <div key={source.source} className="flex items-center justify-between">
                  <span className="capitalize">{source.source}</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{source.count}</span>
                    <Progress 
                      value={(source.count / metrics.totalPageViews) * 100} 
                      className="w-24" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimos registros</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {records.slice(0, 10).map((record) => (
                <div key={record.id} className="flex items-center justify-between border-b pb-2">
                  <div className="text-sm">
                    <div className="font-medium">
                      {record.email || 'Visitante anônimo'}
                    </div>
                    <div className="text-muted-foreground">
                      {record.page_viewed_at ? 
                        new Date(record.page_viewed_at).toLocaleString('pt-BR') : 
                        'Data não disponível'}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {record.quiz_started_at && <Badge variant="secondary">Quiz</Badge>}
                    {record.email && <Badge variant="default">Email</Badge>}
                    {record.quiz_completed_at && <Badge variant="default">Completo</Badge>}
                    {record.vsl_clicked_at && <Badge variant="destructive">VSL</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};