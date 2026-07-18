package components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsHoveredAsState
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import theme.ExpressiveMotion
import theme.glassmorphicPanel
import theme.neuromorphicButton

@Composable
fun HeroSection() {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 120.dp, horizontal = 32.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Tagline badge
        Box(
            modifier = Modifier
                .glassmorphicPanel(cornerRadius = 100f, intensity = 1.5f)
                .background(Color.White.copy(alpha = 0.05f), RoundedCornerShape(100f))
                .padding(horizontal = 24.dp, vertical = 12.dp)
        ) {
            Text(
                "Introducing the new Azphalt Storefront",
                color = Color(0xFFE0E0FF),
                fontSize = 14.sp,
                fontWeight = FontWeight.SemiBold,
                letterSpacing = 1.sp
            )
        }

        Spacer(Modifier.height(48.dp))

        // Massive typography
        Text(
            text = "Physics-Driven Modules.",
            fontSize = 72.sp,
            fontWeight = FontWeight.ExtraBold,
            color = Color.White,
            lineHeight = 84.sp
        )
        Text(
            text = "Designed for Creators.",
            fontSize = 72.sp,
            fontWeight = FontWeight.ExtraBold,
            color = Color(0xFF8B7AF0), // Gradient fallback color
            lineHeight = 84.sp
        )

        Spacer(Modifier.height(32.dp))

        Text(
            text = "Browse high-performance skeuomorphic filters, transitions, and generators\nfor Vegas Pro and web environments.",
            fontSize = 20.sp,
            color = Color(0xFFA0A0B0),
            lineHeight = 32.sp,
            modifier = Modifier.padding(horizontal = 64.dp)
        )
        
        Spacer(Modifier.height(64.dp))
        
        // Interactive Hero Button demonstrating inherent conveyance
        HeroButton()
    }
}

@Composable
fun HeroButton() {
    val interactionSource = remember { MutableInteractionSource() }
    val isPressed by interactionSource.collectIsPressedAsState()
    val isHovered by interactionSource.collectIsHoveredAsState()

    val scale by animateFloatAsState(
        targetValue = if (isPressed) 0.92f else if (isHovered) 1.05f else 1f,
        animationSpec = if (isPressed) ExpressiveMotion.FastEffects else ExpressiveMotion.BouncySpring
    )

    Box(
        modifier = Modifier
            .scale(scale)
            .width(240.dp)
            .height(64.dp)
            .clip(RoundedCornerShape(32.dp))
            .background(
                Brush.linearGradient(
                    colors = listOf(Color(0xFF6C47FF), Color(0xFF4A25DD)),
                    start = Offset(0f, 0f),
                    end = Offset(1000f, 1000f)
                )
            )
            .neuromorphicButton(isPressed = isPressed, cornerRadius = 32f)
            .clickable(
                interactionSource = interactionSource,
                indication = null,
                onClick = { /* Smooth scroll to registry */ }
            )
    ) {
        Text(
            "Explore Registry",
            modifier = Modifier.align(Alignment.Center),
            color = Color.White,
            fontSize = 18.sp,
            fontWeight = FontWeight.Bold,
            letterSpacing = 0.5.sp
        )
    }
}
