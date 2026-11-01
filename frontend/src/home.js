import { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import CloudUploadOutlined from "@material-ui/icons/CloudUploadOutlined";
import EcoOutlined from "@material-ui/icons/EcoOutlined";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import Autorenew from "@material-ui/icons/Autorenew";
import Clear from "@material-ui/icons/Clear";
import { DropzoneArea } from "material-ui-dropzone";
import image from "./bg.png";

const axios = require("axios").default;

const useStyles = makeStyles((theme) => ({
  page: {
    minHeight: "100vh",
    position: "relative",
    overflowX: "hidden",
    overflowY: "auto",
    backgroundColor: "#f4f7f2",
    backgroundImage: `linear-gradient(115deg, rgba(8, 38, 30, .9), rgba(22, 76, 53, .72)), url(${image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
  },
  glow: {
    position: "absolute",
    width: 430,
    height: 430,
    borderRadius: "50%",
    background: "rgba(212, 241, 181, .13)",
    filter: "blur(4px)",
    top: -190,
    right: -80,
    pointerEvents: "none",
  },
  nav: {
    height: 78,
    display: "flex",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
    borderBottom: "1px solid rgba(255,255,255,.14)",
  },
  brand: { display: "flex", alignItems: "center", gap: 10 },
  brandIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#173c2c",
    background: "#d8f1bc",
  },
  brandName: { color: "#fff", fontWeight: 800, letterSpacing: ".01em" },
  brandSub: { color: "rgba(255,255,255,.62)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase" },
  content: {
    position: "relative",
    zIndex: 1,
    minHeight: "calc(100vh - 78px)",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(3, 0),
  },
  eyebrow: {
    color: "#c8eb9b",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: ".2em",
    textTransform: "uppercase",
    marginBottom: 16,
  },
  headline: {
    color: "#fff",
    fontWeight: 800,
    fontSize: "clamp(2.6rem, 6vw, 5.3rem)",
    lineHeight: .98,
    letterSpacing: "-.055em",
    maxWidth: 680,
    marginBottom: 22,
  },
  accent: { color: "#d4f1a9" },
  intro: {
    color: "rgba(255,255,255,.76)",
    fontSize: 17,
    lineHeight: 1.7,
    maxWidth: 530,
    marginBottom: 28,
  },
  assurance: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    color: "rgba(255,255,255,.72)",
    fontSize: 13,
  },
  panel: {
    position: "relative",
    borderRadius: 28,
    padding: theme.spacing(2.25),
    background: "rgba(255,255,255,.9)",
    boxShadow: "0 28px 80px rgba(4, 24, 16, .3)",
    backdropFilter: "blur(18px)",
    animation: "$rise .65s ease both",
  },
  panelHeader: { padding: theme.spacing(1.25, 1.4, 1.7) },
  panelKicker: { color: "#6c7b73", fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8 },
  panelTitle: { color: "#143b2a", fontWeight: 800, fontSize: 24, letterSpacing: "-.03em" },
  dropzone: {
    minHeight: 260,
    border: "1.5px dashed #9fc5a5 !important",
    borderRadius: "20px !important",
    background: "linear-gradient(145deg, #f5fbf0, #edf8f2) !important",
    transition: "transform .2s ease, border-color .2s ease, background .2s ease",
    "&:hover": { transform: "translateY(-2px)", borderColor: "#397956 !important", background: "#f1faea !important" },
  },
  dropzoneText: { color: "#315c45 !important", fontSize: "15px !important", fontWeight: "700 !important", maxWidth: 230, lineHeight: "1.45 !important" },
  dropzoneIcon: { color: "#5e9b68 !important", fontSize: "54px !important", marginBottom: "8px !important" },
  helper: { color: "#84958b", fontSize: 12, textAlign: "center", marginTop: 14 },
  previewWrap: { padding: 0, overflow: "hidden", borderRadius: 20, background: "#10291e", position: "relative" },
  preview: { width: "100%", height: 270, objectFit: "cover", display: "block", opacity: .9 },
  previewShade: { position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(8,29,19,.72))" },
  processing: { padding: theme.spacing(2.5, 1, 1.5), textAlign: "center" },
  spinner: { color: "#4e8c59 !important", marginBottom: 12 },
  processingTitle: { color: "#173f2b", fontWeight: 800 },
  processingCopy: { color: "#788a80", fontSize: 13, marginTop: 5 },
  result: { marginTop: 16, borderRadius: 18, padding: theme.spacing(2), background: "#eef8e8", border: "1px solid #d7ebd2" },
  resultLabel: { color: "#78907d", fontSize: 11, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 7 },
  resultClass: { color: "#1a5635", fontWeight: 800, fontSize: 25, textTransform: "capitalize", wordBreak: "break-word" },
  confidence: { color: "#588361", fontWeight: 800, fontSize: 18 },
  confidenceBar: { height: 7, borderRadius: 5, background: "#d7e9d2", marginTop: 13, overflow: "hidden" },
  confidenceFill: { height: "100%", borderRadius: 5, background: "linear-gradient(90deg, #a8d76e, #438957)", transition: "width .8s ease" },
  clear: { marginTop: 15, width: "100%", borderRadius: 13, padding: "13px 20px", textTransform: "none", color: "#305c42", fontWeight: 800, background: "#fff !important", border: "1px solid #d7e6d5", boxShadow: "none", "&:hover": { background: "#f3faef !important" } },
  featureRow: { display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap" },
  feature: { display: "flex", alignItems: "center", gap: 7, color: "rgba(255,255,255,.7)", fontSize: 12 },
  featureIcon: { color: "#c8eb9b", fontSize: 18 },
  "@keyframes rise": { from: { opacity: 0, transform: "translateY(18px)" }, to: { opacity: 1, transform: "translateY(0)" } },
  [theme.breakpoints.down("sm")]: {
    content: { minHeight: "auto", display: "block", padding: theme.spacing(5, 0, 6) },
    headline: { fontSize: "clamp(2.6rem, 14vw, 4.2rem)" },
    intro: { fontSize: 15 },
    panel: { marginTop: 12 },
    nav: { height: 68 },
  },
}));

export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [imageSelected, setImageSelected] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  let confidence = 0;

  const sendFile = useCallback(async () => {
    if (imageSelected && selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const res = await axios({ method: "post", url: process.env.REACT_APP_API_URL, data: formData });
        if (res.status === 200) setData(res.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsloading(false);
      }
    }
  }, [imageSelected, selectedFile]);

  const clearData = () => {
    setData(null);
    setImageSelected(false);
    setSelectedFile(null);
    setPreview(null);
    setIsloading(false);
  };

  useEffect(() => {
    if (!selectedFile) { setPreview(undefined); return; }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) return;
    setIsloading(true);
    sendFile();
  }, [preview, sendFile]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined); setImageSelected(false); setData(undefined); return;
    }
    setSelectedFile(files[0]); setData(undefined); setImageSelected(true);
  };

  if (data) confidence = (parseFloat(data.confidence) * 100).toFixed(2);

  return (
    <main className={classes.page}>
      <div className={classes.glow} />
      <Container maxWidth="lg">
        <nav className={classes.nav} aria-label="Primary navigation">
          <div className={classes.brand}>
            <div className={classes.brandIcon}><EcoOutlined /></div>
            <div><Typography className={classes.brandName}>PlantGuard</Typography><Typography className={classes.brandSub}>Leaf intelligence</Typography></div>
          </div>
        </nav>
        <div className={classes.content}>
          <Grid container spacing={7} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography className={classes.eyebrow}>Smart crop care · powered by AI</Typography>
              <Typography component="h1" className={classes.headline}>A healthier crop starts with a <span className={classes.accent}>single leaf.</span></Typography>
              <Typography className={classes.intro}>Upload a clear photo of a potato leaf and get an instant disease classification to help you act early and grow with confidence.</Typography>
              <div className={classes.assurance}><VerifiedUserOutlined fontSize="small" /> Your image is analyzed securely and never stored.</div>
              <div className={classes.featureRow}>
                <div className={classes.feature}><CheckCircleOutline className={classes.featureIcon} /> Fast analysis</div>
                <div className={classes.feature}><CheckCircleOutline className={classes.featureIcon} /> Simple results</div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className={classes.panel} elevation={0}>
                {!imageSelected && <div className={classes.panelHeader}><Typography className={classes.panelKicker}>Start a new scan</Typography><Typography className={classes.panelTitle}>Add a leaf photo</Typography></div>}
                {imageSelected && <div className={classes.panelHeader}><Typography className={classes.panelKicker}>Image received</Typography><Typography className={classes.panelTitle}>Reviewing your leaf</Typography></div>}
                {!imageSelected && <CardContent style={{ padding: 0 }}><DropzoneArea acceptedFiles={["image/*"]} dropzoneText="Drag & drop a potato leaf photo here" onChange={onSelectFile} showPreviews={false} showPreviewsInDropzone={false} filesLimit={1} dropzoneClass={classes.dropzone} dropzoneParagraphClass={classes.dropzoneText} icon={CloudUploadOutlined} /></CardContent>}
                {imageSelected && preview && <div className={classes.previewWrap}><img className={classes.preview} src={preview} alt="Uploaded potato leaf" /><div className={classes.previewShade} /></div>}
                {imageSelected && isLoading && <div className={classes.processing}><CircularProgress size={30} className={classes.spinner} /><Typography className={classes.processingTitle}>Analyzing leaf health…</Typography><Typography className={classes.processingCopy}>Our model is checking visual patterns.</Typography></div>}
                {data && <div className={classes.result}><Typography className={classes.resultLabel}>Classification result</Typography><Grid container alignItems="flex-end" justifyContent="space-between"><Grid item xs={8}><Typography className={classes.resultClass}>{data.class}</Typography></Grid><Grid item><Typography className={classes.confidence}>{confidence}%</Typography></Grid></Grid><div className={classes.confidenceBar}><div className={classes.confidenceFill} style={{ width: `${confidence}%` }} /></div></div>}
                {data && <Button className={classes.clear} onClick={clearData} startIcon={<Autorenew />} endIcon={<Clear fontSize="small" />}>Scan another leaf</Button>}
              </Card>
            </Grid>
          </Grid>
        </div>
      </Container>
    </main>
  );
};
