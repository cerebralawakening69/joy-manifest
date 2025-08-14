import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface FunnelMetrics {
  totalPageViews: number;
  quizStarted: number;
  emailScreenReached: number;
  emailProvided: number;
  quizCompleted: number;
  resultViewed: number;
  vslClicked: number;
  conversionRates: {
    pageToQuizStart: number;
    quizToEmailScreen: number;
    emailScreenToProvided: number;
    emailToCompleted: number;
    completedToResultViewed: number;
    resultToVslClick: number;
  };
}

export interface FunnelRecord {
  id: string;
  page_viewed_at: string | null;
  quiz_started_at: string | null;
  email_screen_reached_at: string | null;
  email: string | null;
  quiz_completed_at: string | null;
  result_viewed_at: string | null;
  vsl_clicked_at: string | null;
  vsl_click_count: number | null;
  conversion_event_fired: boolean | null;
  last_question_reached: number | null;
  primary_desire: string;
  manifestation_frequency: string;
  main_block: string;
  manifestation_profile: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

export const useFunnelAnalytics = () => {
  const [metrics, setMetrics] = useState<FunnelMetrics | null>(null);
  const [records, setRecords] = useState<FunnelRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch all records
      const { data: allRecords, error: recordsError } = await supabase
        .from('quiz_manifestation')
        .select('*')
        .order('page_viewed_at', { ascending: false });

      if (recordsError) {
        throw recordsError;
      }

      setRecords(allRecords || []);

      // Calculate metrics
      const totalPageViews = allRecords?.filter(r => r.page_viewed_at).length || 0;
      const quizStarted = allRecords?.filter(r => r.quiz_started_at).length || 0;
      const emailScreenReached = allRecords?.filter(r => r.email_screen_reached_at).length || 0;
      const emailProvided = allRecords?.filter(r => r.email && r.email !== '').length || 0;
      const quizCompleted = allRecords?.filter(r => r.quiz_completed_at).length || 0;
      const resultViewed = allRecords?.filter(r => r.result_viewed_at).length || 0;
      const vslClicked = allRecords?.filter(r => r.vsl_clicked_at).length || 0;

      // Calculate conversion rates
      const calculateRate = (numerator: number, denominator: number) => 
        denominator > 0 ? (numerator / denominator) * 100 : 0;

      const conversionRates = {
        pageToQuizStart: calculateRate(quizStarted, totalPageViews),
        quizToEmailScreen: calculateRate(emailScreenReached, quizStarted),
        emailScreenToProvided: calculateRate(emailProvided, emailScreenReached),
        emailToCompleted: calculateRate(quizCompleted, emailProvided),
        completedToResultViewed: calculateRate(resultViewed, quizCompleted),
        resultToVslClick: calculateRate(vslClicked, resultViewed)
      };

      setMetrics({
        totalPageViews,
        quizStarted,
        emailScreenReached,
        emailProvided,
        quizCompleted,
        resultViewed,
        vslClicked,
        conversionRates
      });

      setError(null);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const getQuestionDropoffs = () => {
    if (!records.length) return [];

    const questionDropoffs = [
      { question: 1, reached: records.filter(r => r.last_question_reached && r.last_question_reached >= 1).length },
      { question: 2, reached: records.filter(r => r.last_question_reached && r.last_question_reached >= 2).length },
      { question: 3, reached: records.filter(r => r.last_question_reached && r.last_question_reached >= 3).length },
    ];

    return questionDropoffs.map((q, index) => ({
      ...q,
      dropoffRate: index === 0 ? 0 : 
        questionDropoffs[index - 1].reached > 0 ? 
        ((questionDropoffs[index - 1].reached - q.reached) / questionDropoffs[index - 1].reached) * 100 : 0
    }));
  };

  const getTrafficSources = () => {
    if (!records.length) return [];

    const sources = records.reduce((acc, record) => {
      const source = record.utm_source || 'direct';
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(sources)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count);
  };

  const getCohortAnalysis = () => {
    if (!records.length) return [];

    // Group by date
    const cohorts = records.reduce((acc, record) => {
      if (!record.page_viewed_at) return acc;
      
      const date = new Date(record.page_viewed_at).toDateString();
      if (!acc[date]) {
        acc[date] = {
          date,
          pageViews: 0,
          quizStarted: 0,
          emailProvided: 0,
          completed: 0,
          vslClicked: 0
        };
      }

      acc[date].pageViews++;
      if (record.quiz_started_at) acc[date].quizStarted++;
      if (record.email) acc[date].emailProvided++;
      if (record.quiz_completed_at) acc[date].completed++;
      if (record.vsl_clicked_at) acc[date].vslClicked++;

      return acc;
    }, {} as Record<string, any>);

    return Object.values(cohorts)
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return {
    metrics,
    records,
    loading,
    error,
    fetchAnalytics,
    getQuestionDropoffs,
    getTrafficSources,
    getCohortAnalysis
  };
};